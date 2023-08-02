import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadingProvider } from "@/providers";
import { AuthProvider } from "@/concepts/Auth";
import { AccountProvider } from "@/concepts/Account";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <LoadingProvider>
        <AuthProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </AuthProvider>
      </LoadingProvider>
    </ChakraProvider>
  </React.StrictMode>
);
