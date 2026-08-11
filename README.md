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
- Dockerized FastAPI backend
- Automated backend tests using pytest

---

## Tech Stack

### Backend

- Python 3.12
- FastAPI
- Pydantic
- Boto3
- Open-Meteo API
- Amazon S3
- Uvicorn
- Pytest
- Docker

### Frontend

- React
- Vite
- Tailwind CSS
- Recharts
- Axios

### Cloud & Infrastructure

- Amazon S3
- AWS IAM
- Docker

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
                    │     Dockerized      │
                    └──────┬─────────┬────┘
                           │         │
                    Weather API      │
                           │         │
                           ▼         ▼
                  ┌────────────┐  ┌──────────────┐
                  │ Open-Meteo │  │   Amazon S3  │
                  └────────────┘  └──────────────┘
```

---

## Project Structure

```text
weather-explorer/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── weather.py
│   │   ├── services/
│   │   │   ├── open_meteo.py
│   │   │   └── storage.py
│   │   ├── utils/
│   │   │   └── validation.py
│   │   ├── config.py
│   │   ├── main.py
│   │   └── models.py
│   │
│   ├── tests/
│   │   ├── test_validation.py
│   │   └── test_weather.py
│   │
│   ├── .env.example
│   ├── Dockerfile
│   ├── pytest.ini
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── FileList.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── WeatherChart.jsx
│   │   │   ├── WeatherForm.jsx
│   │   │   └── WeatherTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## API Endpoints

### Health Check

```http
GET /health
```

Returns the health status of the Weather Explorer API.

Example response:

```json
{
  "status": "ok",
  "message": "Weather Explorer API is running"
}
```

### Store Weather Data

```http
POST /store-weather-data
```

Fetches historical weather data from Open-Meteo and stores the raw JSON
response in Amazon S3.

Example request:

```json
{
  "latitude": 21.1458,
  "longitude": 79.0882,
  "start_date": "2026-07-01",
  "end_date": "2026-07-07"
}
```

### List Weather Files

```http
GET /list-weather-files
```

Returns the weather files stored in the configured S3 bucket.

### Get Weather File Content

```http
GET /weather-file-content/{file}
```

Retrieves the complete contents of a selected weather JSON file from
Amazon S3.

---

## Weather File Naming

Weather files contain the requested location, date range and a timestamp.

Example:

```text
weather_21.1458_79.0882_2026-07-01_2026-07-07_20260811T121221Z.json
```

The timestamp allows multiple requests for the same location and date range
to be stored as separate S3 objects.

---

## Validation

The backend validates:

- Latitude values between -90 and 90
- Longitude values between -180 and 180
- Valid start and end dates
- Start date must not be after end date
- Maximum 31-day date range
- Requested weather file availability

Invalid requests return appropriate API error responses.

---

## Frontend Dashboard

The React dashboard provides:

- Latitude and longitude input
- Start and end date selection
- Fetch and store weather data
- Stored S3 file listing
- Weather file selection
- Daily maximum and minimum temperature chart
- Daily weather data table
- Pagination with 10, 20 and 50 rows
- Loading states
- Error handling

---

## AWS S3 Storage

Amazon S3 is used as the persistent storage layer for raw weather JSON
responses.

The backend uses Boto3 to:

1. Fetch weather data from Open-Meteo
2. Store the raw JSON response in S3
3. List stored weather files
4. Retrieve individual weather files

AWS credentials are loaded through environment variables and are never
exposed to the React frontend.

---

## AWS IAM

The application uses AWS IAM to restrict access to the resources required
by the backend.

The application follows a least-privilege approach for S3 operations.

Required S3 operations include:

```text
s3:ListBucket
s3:GetObject
s3:PutObject
```

The actual AWS credentials are stored locally in the backend `.env` file
and are excluded from Git using `.gitignore`.

---

## Environment Configuration

Create a `.env` file inside the `backend` directory.

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your_bucket_name
```

A `.env.example` file is included in the repository as a safe template.

Example:

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
S3_BUCKET_NAME=
```

**Never commit the actual `.env` file or AWS credentials to GitHub.**

---

## Running Locally

### Backend

From the project root:

```powershell
cd backend
```

Activate the virtual environment:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger/OpenAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

Open another terminal:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Vite will display the local development URL, for example:

```text
http://localhost:5173
```

If the default port is already in use, Vite may select another available
port such as `5174`.

---

## Docker

The backend includes a Dockerfile for containerized execution.

### Build Docker Image

From the `backend` directory:

```powershell
docker build -t weather-explorer-backend .
```

### Run Docker Container

```powershell
docker run --name weather-explorer-backend --env-file .env -p 8000:8000 weather-explorer-backend
```

The containerized API is available at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### Docker Health Check

```http
GET /health
```

The containerized backend was successfully verified using the health
endpoint and returned HTTP 200.

Example response:

```json
{
  "status": "ok",
  "message": "Weather Explorer API is running"
}
```

AWS credentials are supplied to the container at runtime using
`--env-file` and are not included in the Docker image.

---

## Testing

Backend tests are implemented using pytest.

From the `backend` directory:

```powershell
python -m pytest -v
```

The test suite covers:

- Valid date range
- Date range exceeding 31 days
- Start date after end date
- API health check

Current test result:

```text
4 passed
```

---

## Error Handling

The backend validates incoming requests and returns meaningful HTTP error
responses for invalid input and unavailable weather files.

The frontend provides loading and error states so that API failures are
presented clearly to the user.

---

## Security

The application follows basic credential-safety and least-privilege
practices:

- AWS credentials are stored in environment variables.
- The actual `.env` file is excluded from Git.
- `.env.example` contains only placeholder values.
- AWS credentials are never sent to the React frontend.
- S3 operations are performed by the backend.
- Docker receives credentials at runtime using `--env-file`.
- AWS credentials are not included in the Docker image.
- IAM permissions are limited to the required S3 operations.

---

## Verification

The application has been verified for:

- Historical weather data retrieval
- Open-Meteo API integration
- S3 weather data storage
- S3 file listing
- S3 file retrieval
- API health check
- Latitude and longitude validation
- Date range validation
- React dashboard rendering
- Temperature chart rendering
- Weather data table rendering
- Pagination with 10, 20 and 50 rows
- Loading states
- Error states
- Backend automated tests
- Docker image build
- Docker container execution
- Containerized API health check

---

## End-to-End Workflow

```text
User
 │
 ▼
React Dashboard
 │
 │ REST API
 ▼
FastAPI Backend
 │
 ├──────────────► Open-Meteo Historical API
 │                       │
 │                       ▼
 │                 Weather JSON
 │
 ▼
Amazon S3
 │
 ├── List stored files
 │
 └── Retrieve selected file
 │
 ▼
FastAPI
 │
 ▼
React Dashboard
 │
 ├── Temperature Chart
 │
 └── Paginated Weather Table
```

---

## Case Study Implementation

This project was developed as a solution to the InRisk Labs Full Stack
Engineer case study.

The implementation provides an end-to-end workflow covering:

1. Historical weather data retrieval
2. Request validation
3. Open-Meteo API integration
4. Raw JSON storage in Amazon S3
5. S3 file listing and retrieval
6. React-based visualization
7. Pagination
8. Dockerized backend
9. Automated backend testing
10. Secure AWS credential handling

---

## Future Improvements

Possible future improvements include:

- Automated frontend tests
- CI/CD pipeline
- Production cloud deployment
- Authentication and authorization
- Structured application logging
- Monitoring and observability
- Weather data caching
- Improved test coverage

---

## License

This project was created for the InRisk Labs Full Stack Engineer case study
and is intended for evaluation and demonstration purposes.

## Author

**Utkarsh Pardhi**

- GitHub: https://github.com/UtkarshPardhi
- Project Repository: https://github.com/UtkarshPardhi/weather-explorer