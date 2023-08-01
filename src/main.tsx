import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/concepts/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
