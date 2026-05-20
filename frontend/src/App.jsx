import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

function App() {

  return (

    <BrowserRouter>

      <div className="bg-gray-950 min-h-screen">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/history"
            element={<History />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;