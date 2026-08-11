from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.weather import router as weather_router

app = FastAPI(
    title="Weather Explorer API",
    description="Historical weather explorer using Open-Meteo and AWS S3",
    version="1.0.0",
)

# Frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Weather routes
app.include_router(weather_router)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Weather Explorer API is running"
    }