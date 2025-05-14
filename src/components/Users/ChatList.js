import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import AddUser from "./AddUser";
import { useSelector, useDispatch } from "react-redux";
import { changeChatView } from "../../redux/features/chatSlice";

const ChatList = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [chats, setChats] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    const dispatch = useDispatch();
    const currentTheme = useSelector((store) => store.theme.currentTheme);

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

    //filter chats everytime the search input changes
    const filteredChats = chats.filter((chat) =>
        chat.userData.username.toLowerCase().includes(filterInput.toLowerCase())
    );

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
            {/* filter users */}
            <div>
                <input
                    className={`border w-64 m-1 rounded-sm ${
                        currentTheme === "light"
                            ? "border-[#3c3836] text-black"
                            : "border-white placeholder-white text-white"
                    }`}
                    placeholder="Search Chats"
                    type="text"
                    value={filterInput}
                    onChange={(e) => setFilterInput(e.target.value)}
                />
            </div>
            <div>
                {filteredChats.map((chat) => (
                    <div
                        className={`${
                            currentTheme === "light"
                                ? "bg-[#3c3836] text-white border-b-1 border-b-white"
                                : "bg-[#f9f5d7] text-black border-b-1 border-b-white"
                        } flex items-center justify-between gap-5 mt-1 cursor-pointer`}
                        key={chat.chatId}
                        onClick={() => handleSelectedChat(chat)}
                    >
                        <div className="flex items-center">
                            <img
                                src={chat.userData.avatar}
                                className="w-[45px] h-[45px] m-1"
                                alt="User Avatar"
                            />
                            <div>
                                <span className="text-lg font-semibold ">
                                    {chat.userData.username}
                                </span>
                                <p className="text-md font-light">{chat.lastMessage}</p>
                            </div>
                        </div>
                        <p className={`${chat.isSeen ? "text-blue-400" : "text-white"} m-4`}>✓</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChatList;
