import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/login.css";

const Login = (props) => {
    const [account, setAccount] = useState(true);

    return (
        <div className="login-page">
            {account ? (
                <LoginForm setAccount={setAccount} />
            ) : (
                <RegisterForm
                    setAccount={setAccount}
                    setNewUser={props.setNewUser}
                />
            )}
        </div>
    );
};

export default Login;
