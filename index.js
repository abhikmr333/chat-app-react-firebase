import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { appRoute } from "./src/App";
import "dotenv/config";
import { Provider } from "react-redux";
import appStore from "./src/redux/appStore";

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
root.render(
    <Provider store={appStore}>
        <RouterProvider router={appRoute} />
    </Provider>
);
