import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools position="bottom" />
  </QueryClientProvider>
);
