# Weather Explorer

A full-stack historical weather explorer application built as part of the
InRisk Labs Full Stack Engineer case study.

The application fetches historical weather data from Open-Meteo, stores the
raw JSON response in Amazon S3, and provides a React dashboard for browsing,
visualizing, and inspecting stored weather data.

---

## Features

- Fetch historical weather data using latitude, longitude, start date and end date
- Maximum 31-day date range validation
- Open-Meteo historical weather API integration
- Store raw weather JSON in Amazon S3
- Deterministic weather file naming
- List stored weather files
- Retrieve stored weather file content
- Responsive React dashboard
- Daily maximum and minimum temperature line chart
- Daily weather data table
- Pagination with 10, 20 and 50 rows
- Loading and error states
- AWS IAM least-privilege access
- REST API documentation using Swagger/OpenAPI

---

## Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- Boto3
- Open-Meteo API
- Amazon S3

### Frontend

- React
- Vite
- Tailwind CSS
- Recharts
- Axios

---

## Architecture

```text
                    ┌─────────────────────┐
                    │     React UI        │
                    │  Vite + Tailwind    │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │      Backend        │
                    └──────┬─────────┬────┘
                           │         │
                    Weather API      │
                           │         │
                           ▼         ▼
                  ┌────────────┐  ┌──────────────┐
                  │ Open-Meteo │  │   Amazon S3   │
                  └────────────┘  └──────────────┘