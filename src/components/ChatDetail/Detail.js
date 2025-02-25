//chat settings, privacy, shared photos, Block User, logout button
import arrowUp from "/arrowUp.png";
import arrowDown from "/arrowDown.png";
import { useState } from "react";

const Detail = () => {
    const [viewMenuNumber, setViewMenuNumber] = useState(null);

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
        { name: "4", label: "Block User" },
        { name: "5", label: "Logout" },
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
        </section>
    );
};
export default Detail;
