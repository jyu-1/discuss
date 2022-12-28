import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import Routing from "./Routing";
import { AuthProvider } from "./AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <Routing />
        </AuthProvider>
    </React.StrictMode>
);
