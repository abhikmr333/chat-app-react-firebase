import userAvatar from "/userAvatar.png";

const ChatList = () => {
    return (
        <section className="overflow-y-scroll">
            <div className=" p-8 pb-0">
                <input className="border-1" type="text" placeholder="search" />
                <button className="bg-blue-500 text-white ml-4"> add </button>
            </div>
            <div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1">
                    <img src={userAvatar} className="w-[30px]" alt="User Avatar" />
                    <div className="flex-col">
                        <span>Some User</span>
                        <p>Hello......</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatList;
