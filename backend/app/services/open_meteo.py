import httpx


OPEN_METEO_URL = "https://archive-api.open-meteo.com/v1/archive"


async def fetch_weather_data(
    latitude: float,
    longitude: float,
    start_date: str,
    end_date: str,
) -> dict:

    params = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "daily": (
            "temperature_2m_max,"
            "temperature_2m_min,"
            "apparent_temperature_max,"
            "apparent_temperature_min"
        ),
        "timezone": "auto",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:

        response = await client.get(
            OPEN_METEO_URL,
            params=params,
        )

        response.raise_for_status()

        return response.json()