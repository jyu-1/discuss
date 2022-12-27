import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, push, set, serverTimestamp, onValue } from "firebase/database";

const ContactList = () => {
    const [contact, setContact] = useState([]);

    useEffect(() => {
        const unsubscribe = onValue(ref(database, "user"), (snapshot) => {
            const temp = [];
            snapshot.forEach((childSnapshot) => {
                const tempObject = {
                    ...childSnapshot.val(),
                    id: childSnapshot.key,
                };
                temp.push(tempObject);
            });
            setContact(temp);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="contact-list">
            {contact.map((item) => {
                return (
                    <div className="contact" key={item.id}>
                        {item.displayName}
                    </div>
                );
            })}
        </div>
    );
};

export default ContactList;
