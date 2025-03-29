import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AddUser from "./AddUser";
import { useSelector, useDispatch } from "react-redux";
import { changeChatView } from "../../redux/features/chatSlice";
import { findNonSerializableValue } from "@reduxjs/toolkit";

const ChatList = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        //attaching a listener so the records are fetched everytime userChats changes
        if (currentUser) {
            const userChatsDocRef = doc(db, "userchats", currentUser.id);
            const unSubscribe = onSnapshot(userChatsDocRef, async (document) => {
                const items = document.data()?.chats;
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

    const handleSelectedChat = async (chat) => {
        //changing isSeen when the currentUser clicks on the new message
        // separating userData and userChatData (to not retrieve userChats associated with currentUser again since we already did once)
        //here chats and chat is different
        const userChats = chats.map((chat) => {
            const { userData, ...rest } = chat;
            return rest;
        });
        //find the index at which the user with similar chat.chatId is located inside userChats
        const chatIndex = userChats.findIndex((userChat) => userChat.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;
        // do changes in that index and replace the old userChats with updated one in firebase using updateDoc
        const userChatsRef = doc(db, "userchats", currentUser.id);
        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            dispatch(changeChatView({ ...chat, currentUser }));
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section className="overflow-y-auto">
            <AddUser />
            <div>
                {chats.map((chat) => (
                    <div
                        className={`${
                            chat.isSeen ? "bg-white" : "bg-green-300"
                        } flex items-center gap-5 p-5 cursor-pointer border-b-black border-b-1`}
                        key={chat.chatId}
                        onClick={() => handleSelectedChat(chat)}
                    >
                        <img src={chat.userData.avatar} className="w-[30px]" alt="User Avatar" />
                        <div className="flex-col">
                            <span>{chat.userData.username}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChatList;
