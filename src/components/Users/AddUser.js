import { useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

const AddUser = () => {
    //toggleAddUser is different from addUser
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const userRef = useRef("");
    const [user, setUser] = useState(null);

    const searchUser = async () => {
        if (user === "") setUser(null);
        const { value: username } = userRef.current;
        //create a query
        const userQuery = query(collection(db, "users"), where("username", "==", username));
        //execute a query using getDocs
        const result = await getDocs(userQuery);
        const userData = result?.docs?.[0]?.data();
        userData ? setUser(userData) : setUser("");
    };

    return (
        <>
            <button
                className={(toggleAddUser ? "bg-red-400 " : "bg-blue-400 ") + "text-white w-64 m-1"}
                onClick={() => {
                    setUser(null);
                    setToggleAddUser((prev) => !prev);
                }}
            >
                {toggleAddUser ? "Close" : "Add User"}
            </button>
            {toggleAddUser && (
                <div className="m-2 p-2 flex-col justify-between border-1">
                    <div>
                        <input ref={userRef} className="border-1 rounded-md" type="text" />
                        <button
                            onClick={searchUser}
                            className="bg-blue-400 text-white ml-0.5 rounded-md"
                        >
                            search
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
                                <button className="bg-green-300 h-6 text-l rounded-md">Add</button>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default AddUser;
