import userAvatar from "/userAvatar.png";

const Info = () => {
    return (
        <div className="flex flex-col items-center p-2 border-1">
            <img src={userAvatar} alt="User Profile" className="w-20 h-20" />
            <p>Some User</p>
            <p className="w-72">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis a odit
                quis
            </p>
        </div>
    );
};

export default Info;
