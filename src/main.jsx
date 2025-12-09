import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// In JavaScript, we don't use the '!' non-null assertion.
// If you want to be extra safe, you can check if the element exists, 
// but for a root file, this is standard:
createRoot(document.getElementById("root")).render(<App />);