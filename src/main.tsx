import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { IMAGES } from "./constants";
import { imageCache } from "./services/imageCache";

function initApp() {
  Object.values(IMAGES)
    .forEach((srcs) => {
      imageCache.preloadAll(srcs);
    });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

initApp();