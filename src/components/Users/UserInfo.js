import { useSelector } from "react-redux";
import ThemeSelector from "../ThemeSelector";

const UserInfo = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <div className={"flex h-[100px] gap-x-4 p-4 items-center"}>
            <img
                className="size-12 flex-none rounded-full bg-gray-50"
                src={currentUser && currentUser.avatar}
                alt="userAvatar"
            />
            <div className="min-w-0 flex-auto">
                <p
                    className={`text-lg/6 font-semibold ${
                        currentTheme === "light" ? "text-[#3c3836]" : "text-[#fbf1c7]"
                    }`}
                >
                    {currentUser && currentUser.username}
                </p>
            </div>
            <ThemeSelector />
        </div>
    );
};

export default UserInfo;
