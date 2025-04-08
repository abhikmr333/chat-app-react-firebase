import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const SharedImages = () => {
    const [images, setImages] = useState(null);
    const chatIdOfCurrentConversation = useSelector(
        (store) => store.chat.chatIdOfCurrentConversation
    );

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
        <div className="max-w-50 max-h-50">
            <div className="overflow-auto">
                {images &&
                    images.map((image, index) => (
                        <div className="flex border-1 border-black">
                            <img className="w-10 h-10" key={image} src={image} alt={image} />
                            <p className="text-black">{"Photo " + (index + 1)}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SharedImages;
