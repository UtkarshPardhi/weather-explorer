from datetime import date

import pytest

from app.utils.validation import validate_date_range


def test_valid_date_range():

    validate_date_range(
        date(2026, 1, 1),
        date(2026, 1, 31),
    )


def test_date_range_more_than_31_days():

    with pytest.raises(ValueError):

        validate_date_range(
            date(2026, 1, 1),
            date(2026, 2, 1),
        )


def test_start_date_after_end_date():

    with pytest.raises(ValueError):

        validate_date_range(
            date(2026, 2, 1),
            date(2026, 1, 1),
        )