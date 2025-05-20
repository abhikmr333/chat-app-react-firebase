import Info from "./Info";
import Detail from "./Detail";
import { useSelector } from "react-redux";

const ChatDetail = () => {
    const currentTheme = useSelector((store) => store.theme.currentTheme);

    return (
        <div className={`flex-1 ${currentTheme === "light" ? "bg-[#f9f5d7]" : "bg-[#282828]"}`}>
            <Info />
            <Detail />
        </div>
    );
};

export default ChatDetail;
