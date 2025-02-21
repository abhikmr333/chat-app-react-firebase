const ChatFooter = () => {
    return (
        <section className="flex justify-between border-1 p-5 items-center mt-auto">
            <button className="bg-blue-500 text-white">Images</button>
            <input className="text-black border-1" type="text" placeholder="Type Message..." />
            <div>
                <button className="bg-blue-500 text-white mr-4">Emoji</button>
                <button className="bg-blue-500 text-white">Send</button>
            </div>
        </section>
    );
};

export default ChatFooter;
