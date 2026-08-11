import { useState } from "react";

const initialForm = {
  latitude: "",
  longitude: "",
  start_date: "",
  end_date: "",
};

function WeatherForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      start_date: form.start_date,
      end_date: form.end_date,
    });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Fetch Weather Data
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter a location and select a maximum 31-day range.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Latitude
          </label>

          <input
            type="number"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            min="-90"
            max="90"
            step="any"
            required
            placeholder="21.1458"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Longitude
          </label>

          <input
            type="number"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            min="-180"
            max="180"
            step="any"
            required
            placeholder="79.0882"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Start Date
          </label>

          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            End Date
          </label>

          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Fetching & Storing..." : "Fetch & Store Data"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;