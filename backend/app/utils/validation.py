from datetime import date


MAX_DATE_RANGE_DAYS = 31

def validate_date_range(start_date: date, end_date: date) -> None:
    """
        Validates:
        - start_date must not be after end_date
        - requested range must not exceed 31 days
        """

    if start_date > end_date:
        raise ValueError(
            "start_date must be less than or equal to end_date"
        )

    # Inclusive date range:
    # 1 Jan -> 31 Jan = 31 days
    number_of_days = (end_date - start_date).days + 1

    if number_of_days > MAX_DATE_RANGE_DAYS:
        raise ValueError(
            "Date range cannot exceed 31 days"
        )