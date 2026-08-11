import { useEffect, useState } from "react";

import WeatherForm from "./components/WeatherForm";
import FileList from "./components/FileList";
import WeatherChart from "./components/WeatherChart";
import WeatherTable from "./components/WeatherTable";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

import {
  storeWeatherData,
  listWeatherFiles,
  getWeatherFileContent,
} from "./services/api";


function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [storingData, setStoringData] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  // Load stored files from S3
  const loadFiles = async () => {
    setLoadingFiles(true);
    setError("");

    try {
      const data = await listWeatherFiles();

      setFiles(data.files || []);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Unable to load stored weather files.";

      setError(message);
    } finally {
      setLoadingFiles(false);
    }
  };


  // Load files when application starts
  useEffect(() => {
    loadFiles();
  }, []);


  // Fetch weather data and store it in S3
  const handleStoreWeather = async (weatherRequest) => {
    setStoringData(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await storeWeatherData(weatherRequest);

      setSuccessMessage(
        `Weather data stored successfully: ${result.file}`
      );

      // Refresh S3 file list
      await loadFiles();

      // Automatically open newly stored file
      await handleFileSelect(result.file);

    } catch (err) {
      const detail = err.response?.data?.detail;

      let message = "Unable to store weather data.";

      if (typeof detail === "string") {
        message = detail;
      } else if (detail?.message) {
        message = detail.message;
      }

      setError(message);
    } finally {
      setStoringData(false);
    }
  };


  // Load selected weather file
  const handleFileSelect = async (filename) => {
    setSelectedFile(filename);
    setLoadingWeather(true);
    setError("");

    try {
      const data = await getWeatherFileContent(filename);

      setWeatherData(data);
    } catch (err) {
      const detail = err.response?.data?.detail;

      let message = "Unable to load weather file.";

      if (typeof detail === "string") {
        message = detail;
      } else if (detail?.message) {
        message = detail.message;
      }

      setError(message);
      setWeatherData(null);
    } finally {
      setLoadingWeather(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Weather Explorer
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Explore historical weather data stored in the cloud.
              </p>
            </div>

            <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              Open-Meteo + AWS S3
            </div>

          </div>

        </div>
      </header>


      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <ErrorMessage
          message={error}
          onClose={() => setError("")}
        />

        {successMessage && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}


        {/* Input + Files */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <WeatherForm
              onSubmit={handleStoreWeather}
              loading={storingData}
            />
          </div>

          <div>
            <FileList
              files={files}
              selectedFile={selectedFile}
              onSelect={handleFileSelect}
              loading={loadingFiles}
            />
          </div>

        </div>


        {/* Selected weather data */}
        {selectedFile && (
          <div className="mt-8">

            <div className="mb-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Selected File
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                {selectedFile}
              </p>

            </div>


            {loadingWeather ? (
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <Loading message="Loading weather data..." />
              </div>
            ) : weatherData ? (
              <>

                <WeatherChart weatherData={weatherData} />

                <WeatherTable weatherData={weatherData} />

              </>
            ) : null}

          </div>
        )}

      </main>


      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          Weather Explorer • Full Stack Engineer Case Study
        </div>
      </footer>

    </div>
  );
}


export default App;