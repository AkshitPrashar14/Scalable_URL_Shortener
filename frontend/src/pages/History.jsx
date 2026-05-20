import { useEffect, useState } from "react";

import API from "../services/api";

export default function History() {

  const [urls, setUrls] = useState([]);

  useEffect(() => {

    fetchUrls();

  }, []);

  const fetchUrls = async () => {

    try {

      const res = await API.get("/urls");

      setUrls(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="min-h-[90vh] bg-gray-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        URL History 📜
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-gray-900 rounded-xl overflow-hidden">

          <thead className="bg-gray-800">

            <tr>

              <th className="p-4 text-left">
                Short URL
              </th>

              <th className="p-4 text-left">
                Original URL
              </th>

              <th className="p-4 text-left">
                Clicks
              </th>

              <th className="p-4 text-left">
                Open
              </th>

            </tr>

          </thead>

          <tbody>

            {urls.map((url) => (

              <tr
                key={url.id}
                className="border-b border-gray-800"
              >

                <td className="p-4 text-blue-400">
                  {url.short_code}
                </td>

                <td className="p-4 break-all">
                  {url.original_url}
                </td>

                <td className="p-4">
                  {url.clicks}
                </td>

                <td className="p-4">

                  <a
                    href={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${url.short_code}`}
                    target="_blank"
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Visit
                  </a>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}