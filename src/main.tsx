import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import "./tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadingProvider } from "@/providers";
import { AccountProvider } from "@/concepts/Account";
import { store } from "./store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <LoadingProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </LoadingProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
