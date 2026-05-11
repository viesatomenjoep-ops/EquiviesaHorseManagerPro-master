
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./i18n/config";
  import "./styles/index.css";
  import { BrowserRouter } from "react-router";
  import { ErrorBoundary } from "./app/components/ErrorBoundary";
  import { ThemeProvider } from "next-themes";

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="light">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
  