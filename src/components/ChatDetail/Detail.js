//shared photos, Block User, logout button
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { removeCurrentReceiver } from "../../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import SharedImages from "./SharedImages";
import { useSelector } from "react-redux";
import { changeBlock } from "../../redux/features/chatSlice";
import { blockReceiver, unblockReceiver } from "../../redux/features/userSlice";

const Detail = () => {
    const dispatch = useDispatch();
    const { user, isReceiverBlocked, isCurrentUserBlocked } = useSelector((store) => store.chat);
    const currentUser = useSelector((store) => store.user.currentUser);
    const receiverId = user?.id;
    const currentUserId = currentUser?.id;
    const currentTheme = useSelector((store) => store.theme.currentTheme);

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

    return (
        <section className="flex flex-col items-center text-white p-5">
            {/* Shared Images section */}
            <SharedImages />
            <button
                className={`flex justify-center items-center text-lg font-semibold ${
                    isCurrentUserBlocked
                        ? "bg-black"
                        : isReceiverBlocked
                        ? "bg-blue-500 hover:bg-blue-400"
                        : "bg-red-500 hover:bg-red-400"
                } p-2 m-4 rounded-md w-72`}
                onClick={handleBlock}
            >
                {isCurrentUserBlocked ? "You're Blocked" : isReceiverBlocked ? "Unblock" : "Block"}
            </button>
            <button
                className={`flex justify-center items-center p-2 m-4 rounded-md w-72 text-lg font-semibold ${
                    currentTheme === "light"
                        ? "bg-gray-700 hover:bg-gray-400"
                        : "bg-white hover:bg-gray-200 text-black"
                }`}
                onClick={logOut}
            >
                Logout
            </button>
        </section>
    );
};
export default Detail;
