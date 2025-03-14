import userAvatar from "/userAvatar.png";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const ChatList = () => {
    //toggleAddUser is different from addUser
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const userRef = useRef("");
    const currentUser = useSelector((state) => state.user.currentUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        //attaching a listener so the records are fetched everytime the chats array changes
        const userChatsDocRef = doc(db, "userchats", currentUser.id);
        const unSubscribe = onSnapshot(userChatsDocRef, async (doc) => {
            const items = doc.data()?.chats;
            //now using each item.receiverId fetching the user detail to show their name and avatar
            const promises = items.map(async (item) => {
                const usersDocRef = doc(db, "users", item.receiverId);
                const usersDocSnap = await getDoc(usersDocRef);
                const userData = usersDocSnap.data();

                return { ...item, userData };
            });
            const chatListData = await Promise.all(promises);
            //sorting based on updatedAt
            setChats(
                chatListData,
                sort((a, b) => b.updatedAt - a.updatedAt)
            );
        });

        return () => unSubscribe();
    }, [currentUser.id]);

    const searchUser = () => {
        const { value } = userRef.current;
        console.log("searching for..." + value);
    };

    return (
        <section className="overflow-y-auto">
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
                {chats.map((chat) => (
                    <div
                        className="flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1"
                        key={chat.chatId}
                    >
                        <img src={chat.userData.avatar} className="w-[30px]" alt="User Avatar" />
                        <div className="flex-col">
                            <span>{chat.userData.name}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChatList;
