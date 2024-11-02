/**
 * Entry point of the application.
 *
 * This file sets up the React application by importing necessary modules and rendering the root component.
 *
 * @module main
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
