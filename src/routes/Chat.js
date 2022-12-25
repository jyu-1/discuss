import ChannelList from "../components/ChannelList";
import MainChat from "../components/MainChat";
import ContactList from "../components/ContactList";
import "../styles/chat.css";

const Chat = () => {
    return (
        <div className="chat">
            <ChannelList />
            <MainChat />
            <ContactList />
        </div>
    );
};

export default Chat;
