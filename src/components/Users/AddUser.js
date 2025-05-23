import { useRef, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    setDoc,
    doc,
    serverTimestamp,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSelector } from "react-redux";
import { MAGNIFYING_GLASS } from "../../utils/constants";

const AddUser = () => {
    //toggleAddUser is different from addUser
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const userRef = useRef("");
    const [user, setUser] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    //two users linked to one chat id which will then be used to search the chat messages
    const createNewChat = async () => {
        try {
            //create a new chat and get the chatId as it will be used to link both sender and receiver to the chat doc
            const chatRef = collection(db, "chats");
            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });
            const { id: chatId } = newChatRef;
            //updating receiver's userChat doc
            await updateDoc(doc(db, "userchats", user.id), {
                chats: arrayUnion({
                    chatId,
                    receiverId: currentUser.id,
                    lastMessage: "",
                    updatedAt: Date.now(),
                    isSeen: false,
                }),
            });

            //updating currentUser's(sender's) userChat doc
            await updateDoc(doc(db, "userchats", currentUser.id), {
                chats: arrayUnion({
                    chatId,
                    receiverId: user.id,
                    lastMessage: "",
                    updatedAt: Date.now(),
                    isSeen: false,
                }),
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const searchUser = async () => {
        if (user === "") setUser(null);
        const { value: username } = userRef.current;
        try {
            //create a query
            const userQuery = query(collection(db, "users"), where("username", "==", username));
            //execute a query using getDocs
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty) {
                const userData = querySnapshot?.docs?.[0]?.data();
                setUser(userData);
            } else setUser("");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <button
                className={
                    (toggleAddUser ? "bg-red-300 " : "bg-green-300 ") +
                    "text-black w-64 m-1 rounded-sm"
                }
                onClick={() => {
                    setUser(null);
                    setToggleAddUser((prev) => !prev);
                }}
            >
                {toggleAddUser ? "Close" : "Add User"}
            </button>
            {toggleAddUser && (
                <div
                    className={`m-2 p-2 border-1 rounded-md ${
                        currentTheme === "light" ? "border-black" : "border-white"
                    }`}
                >
                    <div className="flex justify-between">
                        <input
                            ref={userRef}
                            className={`border-1 rounded-md ${
                                currentTheme === "light"
                                    ? "border-black text-black"
                                    : "border-white text-[#f9f5d7]"
                            }`}
                            type="text"
                        />
                        <button
                            onClick={searchUser}
                            className="text-white ml-0.5 rounded-md p-1 bg-[#f5b3d1]"
                        >
                            <img className="h-6" src={MAGNIFYING_GLASS} alt="Search" />
                        </button>
                    </div>
                    {user !== null &&
                        (user === "" ? (
                            <p className="text-orange-600">User Not Found!</p>
                        ) : (
                            <div className=" p-1 m-1 flex justify-between bg-gray-100 rounded-md items-center">
                                <div className="flex items-center">
                                    <img className="w-8 h-8" src={user.avatar} alt="" />
                                    <span>{user.username}</span>
                                </div>
                                <button
                                    className="bg-green-300 h-6 text-l rounded-md"
                                    onClick={createNewChat}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default AddUser;
