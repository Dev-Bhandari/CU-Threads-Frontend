import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./utils/authContext.jsx";
import { ModalProvider } from "./utils/modalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ModalProvider>
            <App />
        </ModalProvider>
    </AuthProvider>
);
