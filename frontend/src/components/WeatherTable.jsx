import { useMemo, useState } from "react";


const PAGE_SIZE_OPTIONS = [10, 20, 50];


function WeatherTable({ weatherData }) {
  const daily = weatherData?.daily;

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  if (!daily?.time?.length) {
    return (
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

        <h2 className="text-xl font-semibold text-slate-900">
          Daily Weather Data
        </h2>

        <p className="mt-4 text-sm text-slate-500">
          No daily weather data available.
        </p>

      </div>
    );
  }


  const rows = useMemo(() => {
    return daily.time.map((date, index) => ({
      date,

      maxTemperature:
        daily.temperature_2m_max?.[index] ?? null,

      minTemperature:
        daily.temperature_2m_min?.[index] ?? null,

      apparentMax:
        daily.apparent_temperature_max?.[index] ?? null,

      apparentMin:
        daily.apparent_temperature_min?.[index] ?? null,
    }));
  }, [daily]);


  const totalPages = Math.ceil(
    rows.length / pageSize
  );


  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );


  const startIndex =
    (safeCurrentPage - 1) * pageSize;

  const endIndex =
    startIndex + pageSize;


  const currentRows = rows.slice(
    startIndex,
    endIndex
  );


  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);

    setPageSize(newSize);
    setCurrentPage(1);
  };


  const goToPreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };


  const goToNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };


  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Daily Weather Data
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {rows.length} total records
          </p>
        </div>


        {/* Page size */}
        <div className="flex items-center gap-2">

          <label
            htmlFor="pageSize"
            className="text-sm text-slate-600"
          >
            Rows:
          </label>

          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option
                key={size}
                value={size}
              >
                {size}
              </option>
            ))}
          </select>

        </div>

      </div>


      {/* Table */}
      <div className="overflow-x-auto">

        <table className="min-w-full divide-y divide-slate-200">

          <thead className="bg-slate-50">

            <tr>

              <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Date
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Max Temp (°C)
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Min Temp (°C)
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Apparent Max (°C)
              </th>

              <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Apparent Min (°C)
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100 bg-white">

            {currentRows.map((row) => (

              <tr
                key={row.date}
                className="transition hover:bg-slate-50"
              >

                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800">
                  {row.date}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-slate-600">
                  {formatTemperature(row.maxTemperature)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-slate-600">
                  {formatTemperature(row.minTemperature)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-slate-600">
                  {formatTemperature(row.apparentMax)}
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-slate-600">
                  {formatTemperature(row.apparentMin)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Pagination */}
      <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-slate-500">

          Showing{" "}

          {rows.length === 0
            ? 0
            : startIndex + 1}

          {" "}to{" "}

          {Math.min(
            endIndex,
            rows.length
          )}

          {" "}of{" "}

          {rows.length}

        </p>


        <div className="flex items-center gap-2">

          <button
            onClick={goToPreviousPage}
            disabled={safeCurrentPage === 1}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>


          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            Page {safeCurrentPage} of {totalPages}
          </span>


          <button
            onClick={goToNextPage}
            disabled={safeCurrentPage === totalPages}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}


function formatTemperature(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  return Number(value).toFixed(1);
}


export default WeatherTable;