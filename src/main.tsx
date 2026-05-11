
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./i18n/config";
  import "./styles/index.css";
  import { BrowserRouter } from "react-router";
  import { ErrorBoundary } from "./app/components/ErrorBoundary";

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
  