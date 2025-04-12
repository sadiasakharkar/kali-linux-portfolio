import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the main App component
import "./index.css"; // Import custom CSS for global styles

// Render the React app to the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
