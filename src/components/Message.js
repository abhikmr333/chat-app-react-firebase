import { useRef } from "react";
import { useEffect } from "react";

const Message = () => {
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <>
            <div className=" ml-auto w-72 bg-gray-300 m-1 rounded-md p-1">
                <p className="">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur molestias
                    quae nisi dolorum. Aliquid veniam incidunt labore natus commodi laborum, nihil
                    eaque maiores atque harum laudantium dignissimos at et recusandae!
                </p>
            </div>
            <div className="w-72 bg-gray-300 m-1 rounded-md p-1">
                <p className="">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur molestias
                    quae nisi dolorum. Aliquid veniam incidunt labore natus commodi laborum, nihil
                    eaque maiores atque harum laudantium dignissimos at et recusandae!
                </p>
            </div>
            <div className="ml-auto w-72 bg-gray-300 m-1 rounded-md p-1">
                <p className="">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur molestias
                    quae nisi dolorum. Aliquid veniam incidunt labore natus commodi laborum, nihil
                    eaque maiores atque harum laudantium dignissimos at et recusandae!
                </p>
            </div>
            <div className="w-72 bg-gray-300 m-1 rounded-md p-1">
                <p className="">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur molestias
                    quae nisi dolorum. Aliquid veniam incidunt labore natus commodi laborum, nihil
                    eaque maiores atque harum laudantium dignissimos at et recusandae!
                </p>
            </div>
            <div ref={endRef}></div>
        </>
    );
};

export default Message;
