import ChannelList from "../components/ChannelList";
import ContactList from "../components/ContactList";
import "../styles/chat.css";
import { Outlet } from "react-router-dom";

const Chat = () => {
    return (
        <div className="chat">
            <ChannelList />
            <Outlet />
            <ContactList />
        </div>
    );
};

export default Chat;
