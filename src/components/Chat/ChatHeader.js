import userAvatar from "/userAvatar.png";
import { useSelector } from "react-redux";

const ChatHeader = () => {
    const currentReceiver = useSelector((store) => store.chat.user);

    return (
        <header className="flex p-5 justify-between border-b-1">
            <div className="flex items-center gap-5 cursor-pointer">
                <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                <div className="flex-col">
                    <span>Some User</span>
                    <p>Hello......</p>
                </div>
            </div>
            <div>
                <button className="bg-blue-600 text-white">Info</button>
            </div>
        </header>
    );
};
export default ChatHeader;
