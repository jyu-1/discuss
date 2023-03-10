import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
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
    const navRef = useRef(null);

    const menuHandler = () => {
        const visibility = navRef.current?.getAttribute("data-visible");
        if (visibility === "false") {
            navRef.current?.setAttribute("data-visible", "true");
        } else {
            navRef.current?.setAttribute("data-visible", "false");
        }
    };

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
            channelName: event.target.channel.value.toLowerCase(),
            createdAt: serverTimestamp(),
        });
        event.target.reset();
    };

    const logOff = async () => {
        await signOut(auth)
            .then(() => {
                console.log("Logout Success");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <>
            <div className="channel-close-button" onClick={menuHandler}>
                Channels
            </div>
            <div className="channel-bar" data-visible="false" ref={navRef}>
                <form className="create-channel" onSubmit={createChannel}>
                    <input
                        type="text"
                        placeholder="Channel"
                        name="channel"
                        required
                        minLength={1}
                        maxLength={15}
                    />
                    <button type="submit">Create Channel</button>
                </form>
                <div className="channel-list">
                    {channelList.map((item) => {
                        return (
                            <div className="channel" key={item.id}>
                                <NavLink
                                    to={`/chat/${item.id}`}
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    # {item.channelName}
                                </NavLink>
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
        </>
    );
};

export default ChannelList;
