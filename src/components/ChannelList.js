import { useEffect, useState } from "react";
import ChannelData from "../test-data/ChannelData";

const ChannelList = () => {
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        setTemp(ChannelData);
    }, []);

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
                <div>User</div>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default ChannelList;
