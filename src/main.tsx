import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import DataContextProvider from "./Contexts/DataContext/DataContextProvider.tsx";
import OrderContextProvider from "./Contexts/OrderContext/OrderContextProvider.tsx";
import StepContextProvider from "./Contexts/StepContext/StepContextProvider.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StepContextProvider>
      <OrderContextProvider>
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </QueryClientProvider>
      </OrderContextProvider>
    </StepContextProvider>
  </React.StrictMode>
);
