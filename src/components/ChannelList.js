import { useEffect, useState } from "react";
import ChannelData from "../test-data/ChannelData";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ChannelList = (props) => {
    const [temp, setTemp] = useState([]);
    const [userInfo, setUserInfo] = useState({
        displayName: "",
        photoURL: "",
        email: "",
    });

    useEffect(() => {
        setTemp(ChannelData);
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            setUserInfo({
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
            });
        }
    }, []);

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
            <div className="channel-list">
                {temp.map((item, index) => {
                    return (
                        <div className="channel" key={index}>
                            #{item.name}
                        </div>
                    );
                })}
            </div>
            <div className="user-bar">
                <div className="user-bar-info">
                    <img
                        src={
                            userInfo.photoURL === null
                                ? props.newUser.photoURL
                                : userInfo.photoURL
                        }
                        alt="pfp"
                    />
                    <div>
                        <div className="user-bar-name">
                            {userInfo.displayName === null
                                ? props.newUser.displayName
                                : userInfo.displayName}
                        </div>
                        <div className="user-bar-email">{userInfo.email}</div>
                    </div>
                </div>
                <button onClick={logOff}>Logout</button>
            </div>
        </div>
    );
};

export default ChannelList;
