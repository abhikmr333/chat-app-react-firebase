import { useSelector } from "react-redux";
import ThemeSelector from "../ThemeSelector";

const UserInfo = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    return (
        <div
            className={
                "flex h-[100px] gap-x-4 p-4 items-center " +
                (currentTheme === "light" ? "bg-[#f9f5d7]" : "bg-[#282828]")
            }
        >
            <img
                className="size-12 flex-none rounded-full bg-gray-50"
                src={currentUser && currentUser.avatar}
                alt="userAvatar"
            />
            <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                    {currentUser && currentUser.username}
                </p>
            </div>
            <ThemeSelector />
        </div>
    );
};

export default UserInfo;
