import { useSelector } from "react-redux";
import { BLOCKED_USER_AVATAR } from "../../utils/constants";

const Info = () => {
    const currentReceiver = useSelector((store) => store.chat.user);

    return (
        currentReceiver && (
            <div className="flex flex-col items-center p-2 border-1">
                <img
                    src={currentReceiver?.avatar || BLOCKED_USER_AVATAR}
                    alt="User Profile"
                    className="w-20 h-20"
                />
                <p>{currentReceiver?.username}</p>
                <p className="w-72">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis a
                    odit quis
                </p>
            </div>
        )
    );
};

export default Info;
