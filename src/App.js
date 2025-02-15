import { createBrowserRouter } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserList from "./components/UserList";
import Chat from "./components/Chat";
import UserDetail from "./components/UserDetail";

const App = () => {
    return (
        <div className="w-screen flex">
            <UserList />
            <Chat />
            <UserDetail />
        </div>
    );
};

const appRoute = createBrowserRouter([
    { path: "/", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/chat", element: <App /> },
]);

export default App;
export { appRoute };
