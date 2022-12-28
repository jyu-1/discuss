import { useState, useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
    const [account, setAccount] = useState(true);
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/chat");
    }, [user, navigate]);

    return (
        <div className="login-page">
            {account ? (
                <LoginForm setAccount={setAccount} />
            ) : (
                <RegisterForm setAccount={setAccount} />
            )}
        </div>
    );
};

export default Login;
