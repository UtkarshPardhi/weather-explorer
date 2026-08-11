from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, Path

from app.models import WeatherRequest
from app.services.open_meteo import fetch_weather_data
from app.services.storage import S3StorageService
from app.utils.validation import validate_date_range


router = APIRouter(
    prefix="",
    tags=["Weather"],
)


@router.post("/store-weather-data")
async def store_weather_data(request: WeatherRequest):

    # Validate date range
    try:
        validate_date_range(
            request.start_date,
            request.end_date,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )

    # Fetch data from Open-Meteo
    try:

        weather_data = await fetch_weather_data(
            latitude=request.latitude,
            longitude=request.longitude,
            start_date=request.start_date.isoformat(),
            end_date=request.end_date.isoformat(),
        )

    except Exception as error:

        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch weather data: {str(error)}",
        )

    # Timestamp for unique filename
    timestamp = datetime.now(timezone.utc).strftime(
        "%Y%m%dT%H%M%SZ"
    )

    filename = (
        f"weather_"
        f"{request.latitude}_"
        f"{request.longitude}_"
        f"{request.start_date}_"
        f"{request.end_date}_"
        f"{timestamp}.json"
    )

    # Store in S3
    try:

        storage = S3StorageService()

        storage.upload_json(
            filename=filename,
            data=weather_data,
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to store weather data: {str(error)}",
        )

    return {
        "status": "ok",
        "file": filename,
    }


@router.get("/list-weather-files")
def list_weather_files():

    try:

        storage = S3StorageService()

        files = storage.list_files()

        return {
            "files": files
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to list weather files: {str(error)}",
        )


@router.get("/weather-file-content/{file}")
def get_weather_file_content(
    file: str = Path(..., min_length=1)
):

    try:

        storage = S3StorageService()

        weather_data = storage.get_file(file)

        if weather_data is None:

            raise HTTPException(
                status_code=404,
                detail={
                    "status": "error",
                    "message": "not found",
                },
            )

        return weather_data

    except HTTPException:
        raise

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve weather file: {str(error)}",
        )