//chat settings, privacy, shared photos, Block User, logout button
import arrowUp from "/arrowUp.png";
import arrowDown from "/arrowDown.png";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { removeCurrentReceiver } from "../../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import SharedImages from "./SharedImages";
import { useSelector } from "react-redux";
import { changeBlock } from "../../redux/features/chatSlice";
import { blockReceiver, unblockReceiver } from "../../redux/features/userSlice";

const Detail = () => {
    const [viewMenuNumber, setViewMenuNumber] = useState(null);
    const dispatch = useDispatch();
    const { user, isReceiverBlocked, isCurrentUserBlocked } = useSelector((store) => store.chat);
    const currentUser = useSelector((store) => store.user.currentUser);
    const receiverId = user?.id;
    const currentUserId = currentUser?.id;

    const handleBlock = () => {
        if (!user) return;
        if (isCurrentUserBlocked) return;

        //updating firebase data, unblock if blocked and block if unblocked (like switching) also updating state manually using createAsyncThunk;
        isReceiverBlocked
            ? dispatch(unblockReceiver({ currentUserId, receiverId }))
            : dispatch(blockReceiver({ currentUserId, receiverId }));

        //update/flip chatSlice->isReceiverBlocked
        dispatch(changeBlock());
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            dispatch(removeCurrentReceiver());
        } catch (err) {
            console.log("Error Logging Out");
        }
    };

    //not using event-delegation for toggling accordion(only 5 buttons)
    const handleAccordion = (event) => {
        //currentTarget will only return the element on which an event is attached
        const { name } = event.currentTarget;
        setViewMenuNumber((prev) => (prev === name ? null : name));
    };

    const menus = [
        { name: "1", label: "Shared Photos" },
        { name: "2", label: "Privacy & Help" },
        { name: "3", label: "Chat Settings" },
    ];
    console.log(receiverId);
    return (
        <section className="flex flex-col items-center text-white p-5">
            {/* {menus.map((menu) => {
                return (
                    <button
                        key={menu.label}
                        name={menu.name}
                        onClick={handleAccordion}
                        className="flex justify-between items-center bg-blue-400 p-2 m-4 rounded-md"
                    >
                        {menu.label}
                        <img
                            className="h-3 w-3"
                            src={viewMenuNumber === menu.name ? arrowUp : arrowDown}
                            alt="arrow"
                        />
                    </button>
                );
            })} */}
            {/* Shared Images section */}
            <SharedImages />
            <button
                className={`flex justify-center items-center ${
                    isCurrentUserBlocked
                        ? "bg-black"
                        : isReceiverBlocked
                        ? "bg-blue-400"
                        : "bg-red-400"
                } p-2 m-4 rounded-md w-72`}
                onClick={handleBlock}
            >
                {isCurrentUserBlocked ? "You're Blocked" : isReceiverBlocked ? "Unblock" : "Block"}
            </button>
            <button
                className="flex justify-center items-center bg-red-400 p-2 m-4 rounded-md w-72"
                onClick={logOut}
            >
                Logout
            </button>
        </section>
    );
};
export default Detail;
