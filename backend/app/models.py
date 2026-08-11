from datetime import date

from pydantic import BaseModel, Field


class WeatherRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    start_date: date
    end_date: date