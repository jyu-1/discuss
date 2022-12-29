import { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { database } from "../firebase";

const ChatMessage = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            await get(child(ref(database), "user/" + props.item.createdBy))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        setUser(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                });
        };

        getProfile();
    }, [props.item.createdBy]);

    return (
        <div className="messages">
            <img src={user.photoURL} alt="pfp" />
            <div>
                <div className="message-date-separate">
                    <span className="message-username">{user.displayName}</span>
                    <span className="message-date">
                        {new Date(props.item.createdAt).toString().slice(4, 21)}
                    </span>
                </div>
                <div className="message-message">{props.item.message}</div>
            </div>
        </div>
    );
};

export default ChatMessage;
