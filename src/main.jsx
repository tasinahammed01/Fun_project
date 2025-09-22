import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProposalApp from "./ProposalApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProposalApp></ProposalApp>
  </StrictMode>
);
