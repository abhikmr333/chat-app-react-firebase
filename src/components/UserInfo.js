const UserInfo = () => {
    return (
        <div class="flex h-[100px] gap-x-4 p-4 items-center">
            <img
                class="size-12 flex-none rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
            />
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">Leslie Alexander</p>
            </div>
        </div>
    );
};

export default UserInfo;
