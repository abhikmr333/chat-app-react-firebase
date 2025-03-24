import { useRef } from "react";
import { updateDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../lib/firebase";

const ChatFooter = () => {
    const textRef = useRef("");
    const chatIdOfCurrentConversation = useSelector(
        (store) => store.chat.chatIdOfCurrentConversation
    );
    //sender
    const currentUser = useSelector((store) => store.user.currentUser);
    //receiver
    const user = useSelector((store) => store.chat.user);

    const handleSend = async () => {
        const { value: text } = textRef.current;
        if (text === "") return;
        if (!chatIdOfCurrentConversation || !currentUser) return;
        try {
            //create a message in a corresponding chatId
            const chatRef = doc(db, "chats", chatIdOfCurrentConversation);
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    image: "",
                    createdAt: new Date(),
                }),
            });
            //updating isSeen,lastMessage and updatedAt of the receiver and sender inside userchats appropriately
            //using loop to not write the same logic twice for updating receiver's and sender's userchats
            const userIds = [currentUser.id, user.id];
            userIds.forEach(async (id) => {
                const userRef = doc(db, "userchats", id);
                //to update a certain index of an array inside firebase doc, first get the array inside the doc, update that array and then merge the updated array
                const userChatsSnap = await getDoc(userRef);
                if (userChatsSnap.exists()) {
                    const userChatsData = userChatsSnap.data();
                    //find on which index the corresponding chat id is
                    const chatAtIndex = userChatsData.chats.findIndex(
                        (chat) => chat.chatId === chatIdOfCurrentConversation
                    );
                    userChatsData.chats[chatAtIndex].lastMessage = text;
                    userChatsData.chats[chatAtIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats.updatedAt = Date.now();
                    //merge the updated userChatsData.chats array
                    await updateDoc(userRef, {
                        chats: userChatsData.chats,
                    });
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <footer className="flex justify-between border-1 p-5 items-center mt-auto">
            <button className="bg-blue-500 text-white">Images</button>
            <input
                className="w-96 text-black border-1"
                type="text"
                placeholder="Type Message..."
                ref={textRef}
            />
            <div>
                <button className="bg-blue-500 text-white mr-4">Emoji</button>
                <button className="bg-blue-500 text-white" onClick={handleSend}>
                    Send
                </button>
            </div>
        </footer>
    );
};

export default ChatFooter;
