import { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { database } from "../firebase";

const ChatMessage = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        get(child(ref(database), "user/" + props.item.createdBy))
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
    }, [props.item.createdBy]);

    return (
        <div className="messages">
            <img src={user.photoURL} alt="pfp" width={50} />
            <div>
                {user.displayName} -{" "}
                {new Date(props.item.createdAt).toISOString().slice(0, 19)}
            </div>
            <div>{props.item.message}</div>
        </div>
    );
};

export default ChatMessage;
