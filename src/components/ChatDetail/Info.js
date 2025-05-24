import { useSelector } from "react-redux";
import { BLOCKED_USER_AVATAR } from "../../utils/constants";

const Info = () => {
    const {
        user: currentReceiver,
        isReceiverBlocked,
        isCurrentUserBlocked,
    } = useSelector((store) => store.chat);
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    return (
        currentReceiver && (
            <div
                className={`flex flex-col items-center p-2 border-1 ${
                    currentTheme === "light" ? "border-[#282828]" : "border-[#f9f5d7]"
                }`}
            >
                <img
                    src={
                        isReceiverBlocked || isCurrentUserBlocked
                            ? BLOCKED_USER_AVATAR
                            : currentReceiver?.avatar
                    }
                    alt="User Profile"
                    className="w-20 h-20"
                />
                <p
                    className={`text-3xl font-semibold ${
                        currentTheme === "light" ? "text-black" : "text-[#f9f5d7]"
                    }`}
                >
                    {currentReceiver?.username}
                </p>
            </div>
        )
    );
};

export default Info;
