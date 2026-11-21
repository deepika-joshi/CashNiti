from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, Any

# Currency Metadata Registry (Scale, Subunit Divisor, and Localized Symbol)
CURRENCY_REGISTRY: Dict[str, Dict[str, Any]] = {
    "INR": {"scale": 2, "divisor": 100, "symbol": "₹", "name": "Indian Rupee", "subunit_name": "Paise"},
    "USD": {"scale": 2, "divisor": 100, "symbol": "$", "name": "US Dollar", "subunit_name": "Cent"},
    "EUR": {"scale": 2, "divisor": 100, "symbol": "€", "name": "Euro", "subunit_name": "Cent"},
    "GBP": {"scale": 2, "divisor": 100, "symbol": "£", "name": "British Pound", "subunit_name": "Penny"},
    "JPY": {"scale": 0, "divisor": 1, "symbol": "¥", "name": "Japanese Yen", "subunit_name": "Yen"},
    "KWD": {"scale": 3, "divisor": 1000, "symbol": "KD", "name": "Kuwaiti Dinar", "subunit_name": "Fils"},
}

def from_subunits(subunits: int, currency: str = "INR", allow_negative: bool = False) -> Decimal:
    """
    Converts 64-bit integer subunits (e.g. Paise) to Python Decimal with exact scale.
    Example: 100050 Paise -> Decimal('1000.50')
    """
    curr = currency.upper()
    if curr not in CURRENCY_REGISTRY:
        raise ValueError(f"Unsupported currency: {currency}")

    if not allow_negative and subunits < 0:
        raise ValueError("Subunit monetary amount cannot be negative.")

    meta = CURRENCY_REGISTRY[curr]
    scale_pattern = Decimal("1") if meta["scale"] == 0 else Decimal("0." + "0" * meta["scale"])
    return (Decimal(subunits) / Decimal(meta["divisor"])).quantize(scale_pattern, rounding=ROUND_HALF_UP)

def to_subunits(amount: Decimal, currency: str = "INR", allow_negative: bool = False) -> int:
    """
    Converts Python Decimal standard amount to 64-bit integer subunits (e.g. Paise).
    Example: Decimal('1000.50') -> 100050 Paise
    """
    curr = currency.upper()
    if curr not in CURRENCY_REGISTRY:
        raise ValueError(f"Unsupported currency: {currency}")

    if not allow_negative and amount < Decimal(0):
        raise ValueError("Monetary amount cannot be negative.")

    meta = CURRENCY_REGISTRY[curr]
    return int((amount * Decimal(meta["divisor"])).quantize(Decimal("1"), rounding=ROUND_HALF_UP))
