import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function WeatherChart({ weatherData }) {
  const daily = weatherData?.daily;

  if (!daily?.time?.length) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">
          Temperature Chart
        </h2>

        <p className="mt-4 text-sm text-slate-500">
          No daily weather data available.
        </p>
      </div>
    );
  }


  const chartData = daily.time.map((date, index) => ({
    date,
    maxTemperature:
      daily.temperature_2m_max?.[index] ?? null,
    minTemperature:
      daily.temperature_2m_min?.[index] ?? null,
  }));


  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Daily Temperature
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Maximum and minimum temperature over the selected period.
        </p>
      </div>


      <div className="h-[360px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="maxTemperature"
              name="Max Temperature"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls
            />

            <Line
              type="monotone"
              dataKey="minTemperature"
              name="Min Temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}


export default WeatherChart;