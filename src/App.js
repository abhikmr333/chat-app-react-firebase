import { createBrowserRouter } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserList from "./components/UserList";
import Chat from "./components/Chat";
import ChatDetail from "./components/ChatDetail";

const App = () => {
    return (
        <div className="w-screen flex">
            <UserList />
            <Chat />
            <ChatDetail />
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
