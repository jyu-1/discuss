import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { database, auth } from "../firebase";
import { ref, push, set, serverTimestamp, onValue } from "firebase/database";

const ChannelList = () => {
    const [userInfo, setUserInfo] = useState({
        displayName: "",
        photoURL: "",
        uid: "",
    });

    const [channelList, setChannelList] = useState([]);

    useEffect(() => {
        const userID = auth.currentUser.uid;
        const unsubscribe = onValue(
            ref(database, "user/" + userID),
            (snapshot) => {
                setUserInfo({ ...snapshot.val(), uid: snapshot.key });
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onValue(
            ref(database, "channel-list"),
            (snapshot) => {
                const temp = [];
                snapshot.forEach((childSnapshot) => {
                    const tempObject = {
                        ...childSnapshot.val(),
                        id: childSnapshot.key,
                    };
                    temp.push(tempObject);
                });
                setChannelList(temp);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const createChannel = (event) => {
        event.preventDefault();
        set(push(ref(database, "channel-list")), {
            createdBy: auth.currentUser.uid,
            channelName: event.target.channel.value,
            createdAt: serverTimestamp(),
        });
        event.target.reset();
    };

    const logOff = async () => {
        await signOut(auth)
            .then(() => {
                console.log("Sign Out Success");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="channel-bar">
            <form onSubmit={createChannel}>
                <input
                    type="text"
                    placeholder="Channel"
                    name="channel"
                    required
                    minLength={1}
                    maxLength={10}
                />
                <button type="submit">Create Channel</button>
            </form>
            <div className="channel-list">
                {channelList.map((item) => {
                    return (
                        <div className="channel" key={item.id}>
                            #{item.channelName}
                        </div>
                    );
                })}
            </div>
            <div className="user-bar">
                <div className="user-bar-info">
                    <img src={userInfo.photoURL} alt="pfp" />
                    <div>
                        <div className="user-bar-name">
                            {userInfo.displayName}
                        </div>
                        <div className="user-bar-email">
                            {auth.currentUser.email}
                        </div>
                    </div>
                </div>
                <button onClick={logOff}>Logout</button>
            </div>
        </div>
    );
};

export default ChannelList;
