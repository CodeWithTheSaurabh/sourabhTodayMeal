// Import the React library
import React from "react";

// Import the ReactDOM library, which provides DOM-related functionality for React
import ReactDOM from "react-dom";

// Import the CSS file for the application
import "./index.css";

// Import the App component, which is the main application component
import App from "./App";

// Render the React application to the DOM
ReactDOM.render(
  // Enable strict mode for the application, which helps catch errors and warnings
  <React.StrictMode>
   
    <App />
  </React.StrictMode>,
  // Get a reference to the HTML element with the ID "root" in the DOM
  document.getElementById("root")
);