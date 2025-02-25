import UserInfo from "./UserInfo";
import ChatList from "./ChatList";

const UserList = () => {
    return (
        <div className="flex flex-col h-screen">
            <UserInfo />
            <ChatList />
        </div>
    );
};

export default UserList;
