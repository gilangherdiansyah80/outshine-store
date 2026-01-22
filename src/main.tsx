import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/index";
import { SWRConfig } from "swr";
import type { Middleware, SWRHook } from "swr";
import { useLoadingStore } from "@/store/loadingStore";

import "./index.css"; // Tailwind CSS

// Middleware to sync SWR loading state with global loading store
const loadingMiddleware: Middleware =
  (useSWRNext: SWRHook) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    const { startDataLoading, stopDataLoading } = useLoadingStore.getState();

    React.useEffect(() => {
      if (swr.isLoading) {
        startDataLoading();
      } else {
        stopDataLoading();
      }

      // Cleanup when swr hook unmounts or key changes
      return () => {
        if (swr.isLoading) {
          stopDataLoading();
        }
      };
    }, [swr.isLoading, startDataLoading, stopDataLoading]);

    return swr;
  };

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <SWRConfig value={{ use: [loadingMiddleware] }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>,
);
