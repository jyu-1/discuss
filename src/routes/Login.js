import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/login.css";

const Login = () => {
    const [account, setAccount] = useState(true);

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
