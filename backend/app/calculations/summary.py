from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, Any, List

PENNY = Decimal("0.01")
PERCENT = Decimal("0.01")

def calculate_totals(transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Computes total inflow (income), total outflow (expense), and net balance
    from a collection of transaction items using exact Python Decimal math.
    """
    total_income = Decimal("0.00")
    total_expenses = Decimal("0.00")

    for tx in transactions:
        amount = Decimal(str(tx.get("amount", 0)))
        tx_type = tx.get("type", "").lower()
        if tx_type == "income":
            total_income += amount
        elif tx_type == "expense":
            total_expenses += amount

    total_income = total_income.quantize(PENNY, rounding=ROUND_HALF_UP)
    total_expenses = total_expenses.quantize(PENNY, rounding=ROUND_HALF_UP)
    net_balance = (total_income - total_expenses).quantize(PENNY, rounding=ROUND_HALF_UP)

    return {
        "total_income": total_income,
        "total_expenses": total_expenses,
        "net_balance": net_balance,
    }


def calculate_savings_rate(total_income: Decimal, total_expenses: Decimal) -> Decimal:
    """
    Computes Savings Rate percentage according to docs/FINANCIAL_LOGIC.md:
    - If total_income > 0: ((total_income - total_expenses) / total_income) * 100
    - If total_income == 0 and total_expenses == 0: 0.00%
    - If total_income == 0 and total_expenses > 0: -100.00%
    """
    income = Decimal(str(total_income))
    expenses = Decimal(str(total_expenses))

    if income > Decimal(0):
        rate = ((income - expenses) / income) * Decimal(100)
        return rate.quantize(PERCENT, rounding=ROUND_HALF_UP)
    elif income == Decimal(0) and expenses == Decimal(0):
        return Decimal("0.00")
    else:
        return Decimal("-100.00")


def calculate_budget_usage(spend: Decimal, limit: Decimal) -> Dict[str, Any]:
    """
    Calculates percentage of budget consumed and remaining headroom.
    """
    spend_dec = Decimal(str(spend))
    limit_dec = Decimal(str(limit))

    if limit_dec > Decimal(0):
        usage_pct = ((spend_dec / limit_dec) * Decimal(100)).quantize(PERCENT, rounding=ROUND_HALF_UP)
        remaining = max(Decimal("0.00"), limit_dec - spend_dec).quantize(PENNY, rounding=ROUND_HALF_UP)
        is_exceeded = spend_dec > limit_dec
    elif limit_dec == Decimal(0) and spend_dec > Decimal(0):
        usage_pct = Decimal("100.00")
        remaining = Decimal("0.00")
        is_exceeded = True
    else:
        usage_pct = Decimal("0.00")
        remaining = Decimal("0.00")
        is_exceeded = False

    return {
        "spend": spend_dec.quantize(PENNY, rounding=ROUND_HALF_UP),
        "limit": limit_dec.quantize(PENNY, rounding=ROUND_HALF_UP),
        "usage_percentage": usage_pct,
        "remaining_budget": remaining,
        "is_exceeded": is_exceeded,
    }
