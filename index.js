import { createRoot } from "react-dom/client";

const rootNode = document.querySelector("#root");
const root = createRoot(rootNode);
root.render(<div className="bg-amber-400">Hello</div>);
