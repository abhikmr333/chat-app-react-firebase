import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AddUser from "./AddUser";

const ChatList = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        //attaching a listener so the records are fetched everytime userChats changes
        if (currentUser) {
            const userChatsDocRef = doc(db, "userchats", currentUser.id);
            const unSubscribe = onSnapshot(userChatsDocRef, async (doc) => {
                const items = doc.data()?.chats;
                //now using each item.receiverId fetching the user detail to show their name and avatar
                const promises = items.map(async (item) => {
                    const usersDocRef = doc(db, "users", item.receiverId);
                    const usersDocSnap = await getDoc(usersDocRef);
                    const userData = usersDocSnap.exists() ? usersDocSnap.data() : null;

                    return { ...item, userData };
                });
                const chatListData = await Promise.all(promises);
                //sorting based on updatedAt
                setChats(chatListData.sort((a, b) => b.updatedAt - a.updatedAt));
            });

            return () => unSubscribe();
        }
    }, [currentUser?.id]);

    return (
        <section className="overflow-y-auto">
            <AddUser />
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
