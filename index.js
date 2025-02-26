import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { appRoute } from "./src/App";
import "dotenv/config";

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
root.render(<RouterProvider router={appRoute} />);
