import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

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
                        <img src={item.photoURL} alt="pfp" width={50} />
                        {item.displayName}
                    </div>
                );
            })}
        </div>
    );
};

export default ContactList;
