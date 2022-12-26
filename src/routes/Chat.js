import ChannelList from "../components/ChannelList";
import MainChat from "../components/MainChat";
import ContactList from "../components/ContactList";
import "../styles/chat.css";

const Chat = (props) => {
    return (
        <div className="chat">
            <ChannelList newUser={props.newUser} />
            <MainChat />
            <ContactList />
        </div>
    );
};

export default Chat;
