import { createRoot } from "react-dom/client";
import SignIn from "./src/components/SignIn";
import SignUp from "./src/components/SignUp";

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
root.render(<SignIn />);
