import { useState } from "react";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {

  const [code, setCode] = useState("");

  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {

    try {

      const res = await API.get(`/analytics/${code}`);

      setData(res.data.data);

    } catch (err) {

      console.log(err);

      alert("Analytics not found");
    }
  };

  const chartData = data
    ? [
        {
          name: data.short_code,
          clicks: data.clicks,
        },
      ]
    : [];

  return (

    <div className="min-h-[90vh] bg-gray-950 text-white flex items-center justify-center p-10">

      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-[700px]">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Analytics Dashboard 📊
        </h1>

        <input
          type="text"
          placeholder="Enter Short Code"
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={fetchAnalytics}
          className="w-full mt-5 bg-purple-600 hover:bg-purple-700 transition-all p-4 rounded-lg font-bold"
        >
          Get Analytics
        </button>

        {data && (

          <div className="mt-8">

            <div className="bg-gray-800 p-5 rounded-xl mb-6 space-y-3">

              <div>
                <span className="text-gray-400">
                  Short Code:
                </span>

                <p>{data.short_code}</p>
              </div>

              <div>
                <span className="text-gray-400">
                  Original URL:
                </span>

                <p className="break-all text-blue-400">
                  {data.original_url}
                </p>
              </div>

              <div>
                <span className="text-gray-400">
                  Total Clicks:
                </span>

                <p className="text-2xl font-bold text-green-400">
                  {data.clicks}
                </p>
              </div>

            </div>

            <div className="bg-gray-800 p-5 rounded-xl">

              <h2 className="text-xl font-bold mb-4">
                Click Analytics
              </h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart data={chartData}>

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="clicks"
                    fill="#8b5cf6"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}