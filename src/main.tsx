import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DataContextProvider from "./Contexts/DataContext/DataContextProvider.tsx";
import OrderContextProvider from "./Contexts/OrderContext/OrderContextProvider.tsx";
import StepContextProvider from "./Contexts/StepContext/StepContextProvider.tsx";
import "./index.css";
import { AnimatePresence } from "framer-motion";
import UpsaleContentProvider from "./Contexts/UpsaleContext/UpsaleContentProvider.tsx";
import "../src/i18n.js";
import Loading from "./Components/Loading.tsx";
// import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StepContextProvider>
      <OrderContextProvider>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait">
            <DataContextProvider>
              <UpsaleContentProvider>
                <Suspense fallback={<Loading />}>
                  <App />
                </Suspense>
              </UpsaleContentProvider>
            </DataContextProvider>
          </AnimatePresence>
        </QueryClientProvider>
      </OrderContextProvider>
    </StepContextProvider>
  </React.StrictMode>
);
