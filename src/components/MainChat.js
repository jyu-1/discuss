import { useEffect, useState } from "react";
import ChatData from "../test-data/ChatData";

const MainChat = () => {
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        setTemp(ChatData);
    }, []);

    return (
        <div className="main-chat">
            <div className="chat-messages">
                {temp.map((item, index) => {
                    return (
                        <div className="messages" key={index}>
                            <div>
                                {item.name} - {item.time}
                            </div>
                            <div>{item.message}</div>
                        </div>
                    );
                })}
            </div>
            <div className="chat-input">
                <input />
                <button>Send</button>
            </div>
        </div>
    );
};

export default MainChat;
