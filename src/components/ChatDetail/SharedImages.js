import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const SharedImages = () => {
    const [images, setImages] = useState(null);
    const chatIdOfCurrentConversation = useSelector(
        (store) => store.chat.chatIdOfCurrentConversation
    );
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    useEffect(() => {
        if (chatIdOfCurrentConversation) {
            const chatMessagesRef = doc(db, "chats", chatIdOfCurrentConversation);
            const unSubscribe = onSnapshot(chatMessagesRef, (document) => {
                const messages = document.data()?.messages;
                const imageList = messages.reduce((acc, message) => {
                    if (message.image) acc.push(message.image);
                    return acc;
                }, []);
                setImages(imageList);
            });
            return () => unSubscribe();
        }
    }, [chatIdOfCurrentConversation]);

    return (
        <div className="flex flex-col items-center">
            <p
                className={`text-xl font-light ${
                    currentTheme === "light" ? "text-[#282828]" : "text-[#f9f5d7]"
                }`}
            >
                SHARED IMAGES
            </p>
            <div
                className={`overflow-y-auto border-3  w-72 h-56 flex flex-wrap justify-center rounded-sm ${
                    currentTheme === "light" ? "border-[#282828]" : "border-[#f9f5d7]"
                }`}
            >
                {images &&
                    images.map((image) => (
                        <div key={image}>
                            <img
                                className={`w-20 h-20 m-1 rounded-md  border-1 ${
                                    currentTheme === "light"
                                        ? "border-[#282828]"
                                        : "border-[#f9f5d7]"
                                }`}
                                src={image}
                                alt={image}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SharedImages;
