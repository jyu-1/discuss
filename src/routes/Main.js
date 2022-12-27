import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Login from "./Login";
import Chat from "./Chat";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
            if (userInfo) {
                setUser(userInfo);
                console.log(userInfo);
            } else {
                setUser(userInfo);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="main">
            <Header />
            {user ? <Chat /> : <Login />}
            <Footer />
        </div>
    );
};

export default Main;
