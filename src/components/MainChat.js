import { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import {
    ref,
    push,
    set,
    serverTimestamp,
    onValue,
    orderByChild,
    query,
    limitToLast,
} from "firebase/database";
import ChatMessage from "./ChatMessage";

const MainChat = () => {
    const [messages, setMessages] = useState([]);

    const sendMessage = async (event) => {
        event.preventDefault();

        set(push(ref(database, "chat/randomChannelId")), {
            createdBy: auth.currentUser.uid,
            message: event.target.message.value,
            createdAt: serverTimestamp(),
        });

        event.target.reset();
    };

    useEffect(() => {
        const unsubscribe = onValue(
            query(
                ref(database, "chat/randomChannelId"),
                orderByChild("createdAt"),
                limitToLast(10)
            ),
            (snapshot) => {
                const temp = [];
                snapshot.forEach((childSnapshot) => {
                    const tempObject = {
                        ...childSnapshot.val(),
                        id: childSnapshot.key,
                    };
                    temp.push(tempObject);
                });
                temp.reverse();
                setMessages(temp);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="main-chat">
            <div className="chat-messages">
                {messages.map((item) => {
                    return <ChatMessage item={item} key={item.id} />;
                })}
            </div>
            <form className="chat-input" onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Messages"
                    name="message"
                    required
                    minLength={1}
                    maxLength={100}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default MainChat;
