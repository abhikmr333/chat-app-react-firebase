import userAvatar from "/userAvatar.png";
import { useState, useRef } from "react";

const ChatList = () => {
    //toggleAddUser is different from addUser
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const userRef = useRef("");

    const searchUser = () => {
        const { value } = userRef.current;
        console.log("searching for..." + value);
    };

    return (
        <section className="overflow-y-scroll">
            <div className=" p-8 pb-0">
                <input className="border-1" type="text" placeholder="search" />
                <button
                    onClick={() => setToggleAddUser((prev) => !prev)}
                    className="bg-blue-500 text-white ml-4"
                >
                    add
                </button>
            </div>
            {toggleAddUser && (
                <div className="m-2 p-2 flex justify-between">
                    <input ref={userRef} className="border-1 rounded-md" type="text" />
                    <button onClick={searchUser} className="bg-blue-400 text-white">
                        search
                    </button>
                </div>
            )}
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
