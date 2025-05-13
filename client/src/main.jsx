import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { SocketContextProvider } from "./context/SocketContext.jsx"; // 🔥 Import this

const CLERK_PUBLISHABLE_KEY = "pk_test_aW50ZWdyYWwtd2FsbGFieS05Ny5jbGVyay5hY2NvdW50cy5kZXYk";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AuthContextProvider>
        <SocketContextProvider> {/* 🔥 Wrap <App /> with SocketContextProvider */}
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);
