import { useSelector } from "react-redux";
import { BLOCKED_USER_AVATAR } from "../../utils/constants";

const ChatHeader = () => {
    const currentReceiver = useSelector((store) => store.chat.user);

    return (
        currentReceiver && (
            <header className="flex p-5 justify-between border-b-1">
                <div className="flex items-center gap-5 cursor-pointer">
                    <img
                        src={currentReceiver?.avatar || BLOCKED_USER_AVATAR}
                        className="w-[30px]"
                        alt="User Avatar"
                    />
                    <div>
                        <span>{currentReceiver?.username}</span>
                        <p>hello....</p>
                    </div>
                </div>
                <div>
                    <button className="bg-blue-600 text-white">Info</button>
                </div>
            </header>
        )
    );
};
export default ChatHeader;
