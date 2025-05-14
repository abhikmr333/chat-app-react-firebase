import { useSelector } from "react-redux";
import { BLOCKED_USER_AVATAR } from "../../utils/constants";

const ChatHeader = () => {
    const {
        user: currentReceiver,
        isReceiverBlocked,
        isCurrentUserBlocked,
    } = useSelector((store) => store.chat);
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    return (
        currentReceiver && (
            <header
                className={`flex p-3 justify-between border-b-1 ${
                    currentTheme === "light" ? "text-[#3c3836]" : "text-[#f9f5d7]"
                } `}
            >
                <div className="flex items-center gap-5 cursor-pointer">
                    <img
                        src={
                            isReceiverBlocked || isCurrentUserBlocked
                                ? BLOCKED_USER_AVATAR
                                : currentReceiver?.avatar
                        }
                        className="w-[50px]"
                        alt="User Avatar"
                    />
                    <div>
                        <span className="text-2xl font-semibold">{currentReceiver?.username}</span>
                    </div>
                </div>
            </header>
        )
    );
};
export default ChatHeader;
