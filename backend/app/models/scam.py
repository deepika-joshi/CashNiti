from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, CheckConstraint, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.models.base import Base

def utc_now():
    return datetime.now(timezone.utc)

class ScamScan(Base):
    __tablename__ = "scam_scans"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    input_type = Column(String(20), nullable=False)
    content_snippet = Column(Text, nullable=False)
    risk_score = Column(Integer, nullable=False)  # 0 to 100
    risk_level = Column(String(15), nullable=False)  # 'low', 'medium', 'high', 'critical'
    detected_flags = Column(JSON, nullable=False)  # Stored list of detected threat markers
    recommendations = Column(JSON, nullable=False)  # Stored list of protective actions
    created_at = Column(DateTime, default=utc_now, nullable=False)

    __table_args__ = (
        CheckConstraint("input_type IN ('sms', 'email', 'url', 'upi', 'text')", name="chk_scam_input_type"),
        CheckConstraint("risk_score BETWEEN 0 AND 100", name="chk_scam_risk_score"),
        CheckConstraint("risk_level IN ('low', 'medium', 'high', 'critical')", name="chk_scam_risk_level"),
        Index("idx_scans_user", "user_id", "created_at"),
    )

    # Relationship
    user = relationship("User", back_populates="scam_scans")
