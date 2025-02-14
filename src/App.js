import { createBrowserRouter } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
    return;
};

const appRoute = createBrowserRouter([
    { path: "/", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
]);

export default App;
export { appRoute };
