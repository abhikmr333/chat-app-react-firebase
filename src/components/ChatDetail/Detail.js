//chat settings, privacy, shared photos, Block User, logout button
import arrowUp from "/arrowUp.png";
import arrowDown from "/arrowDown.png";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const Detail = () => {
    const [viewMenuNumber, setViewMenuNumber] = useState(null);

    const logOut = async () => {
        try {
            await signOut(auth);
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

    return (
        <section className="flex flex-col text-white p-5">
            {menus.map((menu) => {
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
            })}
            <button className="flex justify-between items-center bg-blue-400 p-2 m-4 rounded-md">
                Block User
            </button>
            <button
                className="flex justify-between items-center bg-red-400 p-2 m-4 rounded-md"
                onClick={logOut}
            >
                Logout
            </button>
        </section>
    );
};
export default Detail;
