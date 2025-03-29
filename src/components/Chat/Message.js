import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Loading from "../loading";

const Message = () => {
    const endRef = useRef(null);
    const chatIdOfCurrentConversation = useSelector(
        (store) => store.chat.chatIdOfCurrentConversation
    );
    const currentUser = useSelector((store) => store.user.currentUser);
    const [chat, setChat] = useState(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    //for fetching messages
    useEffect(() => {
        if (chatIdOfCurrentConversation) {
            const chatMessagesRef = doc(db, "chats", chatIdOfCurrentConversation);
            const unSubscribe = onSnapshot(chatMessagesRef, async (document) => {
                setChat(document.data());
            });
            return () => unSubscribe();
        }
    }, [chatIdOfCurrentConversation]);

    return (
        <>
            {chat && currentUser ? (
                chat.messages.map((message) => (
                    <div
                        className={
                            (message.senderId === currentUser.id
                                ? "ml-auto bg-gray-300"
                                : "mr-auto bg-blue-400") + " w-72  m-1 rounded-md p-1"
                        }
                        key={message.createdAt}
                    >
                        <p className="">{message.text}</p>
                    </div>
                ))
            ) : (
                <Loading />
            )}
            {/* To Scroll towards the end of chat box */}
            <div ref={endRef}></div>
        </>
    );
};

export default Message;
