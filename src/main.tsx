import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "react-alice-carousel/lib/alice-carousel.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
