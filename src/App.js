import { createBrowserRouter, Outlet, useLocation } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserList from "./components/Users/UserList";
import Chat from "./components/Chat/Chat";
import ChatDetail from "./components/ChatDetail/ChatDetail";
import Header from "./components/Header";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

const App = () => {
    const path = useLocation().pathname;

    const navigate = useNavigate();
    //setting an observer for better navigation
    useEffect(() => {
        //returns unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                console.log(user);
                navigate("/chat");
            } else {
                // User is signed out
                console.log("user signed out");
                navigate("/");
            }
        });
        //unsubscribing onAuthStateChanged
        return () => unsubscribe();
    }, []);

    return (
        <Provider store={appStore}>
            {path !== "/chat" && <Header />}
            <Outlet />
        </Provider>
    );
};

const appRoute = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <SignIn /> },
            { path: "/signup", element: <SignUp /> },
            {
                path: "/chat",
                element: (
                    <div className="w-screen flex">
                        <UserList />
                        <Chat />
                        <ChatDetail />
                    </div>
                ),
            },
        ],
    },
]);

export default App;
export { appRoute };
