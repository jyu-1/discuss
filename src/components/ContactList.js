import { useEffect, useState } from "react";
import ContactData from "../test-data/ContactData";

const ContactList = () => {
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        setTemp(ContactData);
    }, []);

    return (
        <div className="contact">
            <div>Contacts</div>
            {temp.map((item, index) => {
                return (
                    <div className="contact-list" key={index}>
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
};

export default ContactList;
