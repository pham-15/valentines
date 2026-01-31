import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Valentines2025 from "./pages/Valentines2025";
import Valentines2026 from "./pages/Valentines2026";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2025" element={<Valentines2025 />} />
        <Route path="/2026" element={<Valentines2026 />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
