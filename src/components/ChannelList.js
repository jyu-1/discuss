import { useEffect, useState } from "react";
import ChannelData from "../test-data/ChannelData";

const ChannelList = () => {
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        setTemp(ChannelData);
    }, []);

    return (
        <div className="channel">
            <div>Channels</div>
            {temp.map((item, index) => {
                return (
                    <div className="channel-list" key={index}>
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default ChannelList;
