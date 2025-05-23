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
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "./redux/features/userSlice";
import { deleteUser } from "./redux/features/userSlice";

const App = () => {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //setting an observer for better navigation
    useEffect(() => {
        //returns unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                dispatch(fetchUserInfo(uid));
                navigate("/chat");
            } else {
                // User is signed out
                dispatch(deleteUser());
                navigate("/");
            }
        });
        //unsubscribing onAuthStateChanged
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {path !== "/chat" && <Header />}
            <Outlet />
        </div>
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
