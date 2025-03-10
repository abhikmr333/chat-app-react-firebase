import { useSelector } from "react-redux";

const UserInfo = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div class="flex h-[100px] gap-x-4 p-4 items-center">
            <img
                class="size-12 flex-none rounded-full bg-gray-50"
                src={currentUser && currentUser.avatar}
                alt="userAvatar"
            />
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">
                    {currentUser && currentUser.username}
                </p>
            </div>
        </div>
    );
};

export default UserInfo;
