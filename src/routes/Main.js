import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "./Login";
import Chat from "./Chat";

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userInfo) => {
            setUser(userInfo);
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
