import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { ResourceProvider } from "./context/ResourcesContext/ResourceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ResourceProvider>
            <App />
        </ResourceProvider>
    </AuthProvider>
);
