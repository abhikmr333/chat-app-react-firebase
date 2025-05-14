import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const Chat = () => {
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    return (
        <div
            className={`flex-2 border-1 flex flex-col h-screen ${
                currentTheme === "light" ? "bg-[#f9f5d7]" : "bg-[#282828] border-[#f9f5d7]"
            } `}
        >
            <ChatHeader />
            <Messages />
            <ChatFooter />
        </div>
    );
};

export default Chat;
