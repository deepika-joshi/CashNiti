from decimal import Decimal, ROUND_HALF_UP, ROUND_HALF_EVEN
from typing import Dict, Any, List
from app.core.currency import to_subunits

PENNY = Decimal("0.01")

def calculate_reducing_balance_emi(
    principal: Decimal,
    annual_interest_rate: Decimal,
    tenure_months: int
) -> Dict[str, Any]:
    """
    Computes Equated Monthly Installment (EMI) using the standard reducing-balance formula:
    EMI = P * [r * (1 + r)^n] / [(1 + r)^n - 1]

    Handles zero-interest loans, validates inputs, and ensures all calculations use Decimal arithmetic.
    """
    if principal <= Decimal(0):
        raise ValueError("Principal amount must be greater than zero.")
    if tenure_months <= 0:
        raise ValueError("Tenure months must be greater than zero.")
    if annual_interest_rate < Decimal(0):
        raise ValueError("Annual interest rate cannot be negative.")

    principal_dec = Decimal(str(principal))
    rate_dec = Decimal(str(annual_interest_rate))

    # Case 1: Zero-Interest Loan (0% financing / No-Cost EMI)
    if rate_dec == Decimal(0):
        monthly_emi = (principal_dec / Decimal(tenure_months)).quantize(PENNY, rounding=ROUND_HALF_UP)
        total_repayment = principal_dec.quantize(PENNY, rounding=ROUND_HALF_UP)
        total_interest = Decimal("0.00")
    else:
        # Case 2: Standard Reducing Balance Rate (r = Annual Rate / (12 * 100))
        monthly_rate = rate_dec / Decimal("1200")
        
        # Using Decimal power approximation
        # (1 + r)^n
        growth_factor = (Decimal(1) + monthly_rate) ** tenure_months
        
        emi_raw = principal_dec * (monthly_rate * growth_factor) / (growth_factor - Decimal(1))
        monthly_emi = emi_raw.quantize(PENNY, rounding=ROUND_HALF_UP)
        total_repayment = (monthly_emi * tenure_months).quantize(PENNY, rounding=ROUND_HALF_UP)
        total_interest = (total_repayment - principal_dec).quantize(PENNY, rounding=ROUND_HALF_UP)

    return {
        "monthly_emi": monthly_emi,
        "monthly_emi_subunits": to_subunits(monthly_emi),
        "total_interest": total_interest,
        "total_interest_subunits": to_subunits(total_interest),
        "total_repayment": total_repayment,
        "total_repayment_subunits": to_subunits(total_repayment),
        "principal": principal_dec.quantize(PENNY, rounding=ROUND_HALF_UP),
        "principal_subunits": to_subunits(principal_dec),
        "annual_interest_rate": rate_dec,
        "tenure_months": tenure_months,
    }


def generate_amortization_schedule(
    principal: Decimal,
    annual_interest_rate: Decimal,
    tenure_months: int
) -> List[Dict[str, Any]]:
    """
    Generates a full month-by-month amortization schedule for reducing-balance loans.
    """
    emi_result = calculate_reducing_balance_emi(principal, annual_interest_rate, tenure_months)
    monthly_emi = emi_result["monthly_emi"]
    annual_rate = Decimal(str(annual_interest_rate))
    monthly_rate = annual_rate / Decimal("1200") if annual_rate > 0 else Decimal(0)

    schedule = []
    current_balance = Decimal(str(principal)).quantize(PENNY, rounding=ROUND_HALF_UP)

    for month in range(1, tenure_months + 1):
        if monthly_rate == Decimal(0):
            interest_component = Decimal("0.00")
            principal_component = monthly_emi if month < tenure_months else current_balance
        else:
            interest_raw = current_balance * monthly_rate
            interest_component = interest_raw.quantize(PENNY, rounding=ROUND_HALF_EVEN)
            principal_component = monthly_emi - interest_component

        # Adjust final month to reconcile penny rounding differences
        if month == tenure_months:
            principal_component = current_balance
            closing_balance = Decimal("0.00")
            monthly_emi_actual = principal_component + interest_component
        else:
            closing_balance = (current_balance - principal_component).quantize(PENNY, rounding=ROUND_HALF_UP)
            monthly_emi_actual = monthly_emi

        schedule.append({
            "month_number": month,
            "opening_balance": current_balance,
            "opening_balance_subunits": to_subunits(current_balance),
            "emi_amount": monthly_emi_actual,
            "emi_amount_subunits": to_subunits(monthly_emi_actual),
            "principal_component": principal_component,
            "principal_component_subunits": to_subunits(principal_component),
            "interest_component": interest_component,
            "interest_component_subunits": to_subunits(interest_component),
            "closing_balance": closing_balance,
            "closing_balance_subunits": to_subunits(closing_balance),
        })
        current_balance = closing_balance

    return schedule
