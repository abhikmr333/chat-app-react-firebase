import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import Messages from "./Messages";

const Chat = () => {
    return (
        <div className="flex-2 border-1 flex flex-col">
            <ChatHeader />
            <Messages />
            <ChatFooter />
        </div>
    );
};

export default Chat;
