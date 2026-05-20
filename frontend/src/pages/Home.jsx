import { useState } from "react";
import API from "../services/api";

export default function Home() {

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {

    try {

      const res = await API.post("/shorten", {
        originalUrl: url,
      });

      setShortUrl(res.data.shortUrl);

    } catch (err) {
      console.log(err);
    }
  };

  const copyToClipboard = () => {

    navigator.clipboard.writeText(shortUrl);

    alert("Copied to clipboard!");
  };

  return (

    <div className="min-h-[90vh] bg-gray-950 text-white flex items-center justify-center">

      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-[500px]">

        <h1 className="text-4xl font-bold mb-6 text-center">
          URL Shortener 🚀
        </h1>

        <input
          type="text"
          placeholder="Enter URL"
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-lg font-bold"
        >
          Shorten URL
        </button>

        {shortUrl && (

          <div className="mt-6 bg-gray-800 p-5 rounded-lg">

            <p className="text-green-400 mb-3">
              Short URL Created:
            </p>

            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-400 break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyToClipboard}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 p-3 rounded-lg"
            >
              Copy URL
            </button>

            <div className="bg-white p-4 mt-5 rounded-lg flex justify-center">

              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}`} 
                alt="QR Code" 
              />

            </div>

          </div>
        )}

      </div>

    </div>
  );
}