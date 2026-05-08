
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./i18n/config";
  import "./styles/index.css";
  import { BrowserRouter } from "react-router";
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  