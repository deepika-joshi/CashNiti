from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, CheckConstraint, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    session_id = Column(String(64), unique=True, nullable=False, index=True)
    title = Column(String(150), default="New Conversation", nullable=False)
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now, nullable=False)

    # Relationships
    user = relationship("User", back_populates="ai_conversations")
    messages = relationship("AIMessage", back_populates="conversation", cascade="all, delete-orphan")


class AIMessage(Base):
    __tablename__ = "ai_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(Integer, ForeignKey("ai_conversations.id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(15), nullable=False)  # 'user', 'assistant', 'system'
    content = Column(Text, nullable=False)
    context_snapshot = Column(JSON, nullable=True)  # Snapshot of metrics used for grounding
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("role IN ('user', 'assistant', 'system')", name="chk_ai_message_role"),
        Index("idx_ai_messages_conv", "conversation_id", "created_at"),
    )

    # Relationship
    conversation = relationship("AIConversation", back_populates="messages")
