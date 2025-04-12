import { useRef, useState } from "react";
import { updateDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../lib/firebase";
import { CLOUDINARY_API_URL } from "../../utils/constants";

const ChatFooter = () => {
    const textRef = useRef("");
    const [imageFile, setImageFile] = useState(null);
    const chatIdOfCurrentConversation = useSelector(
        (store) => store.chat.chatIdOfCurrentConversation
    );
    //sender
    const currentUser = useSelector((store) => store.user.currentUser);
    //receiver
    const { user, isReceiverBlocked, isCurrentUserBlocked } = useSelector((store) => store.chat);

    const uploadToCloudinary = async () => {
        //fetch request with appropriate preset
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", "preset_chat_images");

            const response = await fetch(CLOUDINARY_API_URL, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Something went wrong!");
            const result = await response.json();
            return result.secure_url;
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleSend = async () => {
        const { value: text } = textRef.current;
        //when text input is empty or no image file is selected
        if (text === "" && !imageFile) return;
        if (!chatIdOfCurrentConversation || !currentUser) return;
        try {
            let imageUrl = "";
            //uploading image if there's any to cloudinary and getting the url
            if (imageFile) {
                imageUrl = await uploadToCloudinary();
            }
            //create a message in a corresponding chatId
            const chatRef = doc(db, "chats", chatIdOfCurrentConversation);
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    image: imageUrl,
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
                    userChatsData.chats[chatAtIndex].lastMessage = text ? text : imageFile.name;
                    userChatsData.chats[chatAtIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats.updatedAt = Date.now();
                    //merge the updated userChatsData.chats array
                    await updateDoc(userRef, {
                        chats: userChatsData.chats,
                    });
                }
            });
            if (imageFile) setImageFile(null);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleFileChange = (event) => {
        const { files } = event.target;
        const imgFile = files[0];
        setImageFile(imgFile);
    };

    return (
        <footer
            className={
                "flex justify-between border-1 p-5 items-center mt-auto " + isReceiverBlocked ||
                isCurrentUserBlocked
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
            }
        >
            <label htmlFor="image">
                <div className="bg-blue-500 text-white">image</div>
            </label>
            <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                class="hidden"
                onChange={handleFileChange}
                disabled={isReceiverBlocked || isCurrentUserBlocked}
            />

            <input
                className="w-96 text-black border-1"
                type="text"
                placeholder="Type Message..."
                ref={textRef}
                disabled={isReceiverBlocked || isCurrentUserBlocked}
            />

            <div>
                <button
                    className="bg-blue-500 text-white mr-4"
                    disabled={isReceiverBlocked || isCurrentUserBlocked}
                >
                    Emoji
                </button>
                <button
                    className="bg-blue-500 text-white"
                    disabled={isReceiverBlocked || isCurrentUserBlocked}
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </footer>
    );
};

export default ChatFooter;
