import { useRef, useState } from "react";
import { updateDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../lib/firebase";
import {
    CLOUDINARY_API_URL,
    EMOJI_ICON,
    IMAGE_ICON_DARK,
    IMAGE_ICON_LIGHT,
    SEND_ICON,
} from "../../utils/constants";

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
    const currentTheme = useSelector((store) => store.theme.currentTheme);

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
            className={`flex justify-between border-t-1 p-3 items-center mt-auto 
                ${
                    isReceiverBlocked || isCurrentUserBlocked
                        ? " cursor-not-allowed"
                        : " cursor-pointer"
                } ${currentTheme === "light" ? "border-black" : "border-[#f9f5d7]"}
            `}
        >
            <label
                className={currentTheme === "light" ? "" : "bg-white p-1 rounded-md"}
                htmlFor="image"
            >
                <img
                    className="h-8"
                    src={currentTheme === "light" ? IMAGE_ICON_DARK : IMAGE_ICON_LIGHT}
                    alt="image icon"
                />
            </label>
            <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
                disabled={isReceiverBlocked || isCurrentUserBlocked}
            />

            <input
                className={`w-[500px] border-1 rounded-md ${
                    currentTheme === "light"
                        ? "text-black border-black"
                        : "text-[#f9f5d7] border-[#f9f5d7] placeholder-white"
                }`}
                type="text"
                placeholder="Type Message..."
                ref={textRef}
                disabled={isReceiverBlocked || isCurrentUserBlocked}
            />

            <div className="flex items-center">
                <button disabled={isReceiverBlocked || isCurrentUserBlocked}>
                    <img className="h-8 mr-4" src={EMOJI_ICON} alt="emoji icon" />
                </button>
                <button
                    className="bg-white rounded-md shadow-md p-1"
                    disabled={isReceiverBlocked || isCurrentUserBlocked}
                    onClick={handleSend}
                >
                    <img className="h-8" src={SEND_ICON} alt="send icon" />
                </button>
            </div>
        </footer>
    );
};

export default ChatFooter;
