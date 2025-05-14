import UserInfo from "./UserInfo";
import ChatList from "./ChatList";
import { useSelector } from "react-redux";

const UserList = () => {
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    return (
        <div
            className={
                "flex flex-col h-screen " +
                (currentTheme === "light" ? "bg-[#f9f5d7]" : "bg-[#282828]")
            }
        >
            <UserInfo />
            <ChatList />
        </div>
    );
};

export default UserList;
