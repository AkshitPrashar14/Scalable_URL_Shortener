import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav className="bg-gray-900 text-white px-10 py-5 flex justify-between items-center shadow-lg">

      <h1 className="text-2xl font-bold">
        URL Shortener 🚀
      </h1>

      <div className="flex gap-6 text-lg">

        <Link
          to="/"
          className="hover:text-blue-400"
        >
          Home
        </Link>

        <Link
          to="/analytics"
          className="hover:text-purple-400"
        >
          Analytics
        </Link>

        <Link
          to="/history"
          className="hover:text-yellow-400"
        >
          History
        </Link>


        <a
          href="http://localhost:3000"
          target="_blank"
          className="hover:text-green-400"
        >
          Grafana
        </a>

      </div>

    </nav>
  );
}