import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";

import "./tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import { ChakraProvider } from "@chakra-ui/react";
import { LoadingProvider } from "@/providers";
import { AccountProvider } from "@/concepts/Account";
import { store } from "./store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <Provider store={store}>
        <ChakraProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </ChakraProvider>
      </Provider>
    </LoadingProvider>
  </React.StrictMode>
);
