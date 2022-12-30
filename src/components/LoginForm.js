import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const LoginForm = (props) => {
    const [alert, setAlert] = useState("");

    const login = async (event) => {
        event.preventDefault();
        await signInWithEmailAndPassword(
            auth,
            event.target.email.value,
            event.target.password.value
        )
            .then((userCredential) => {
                console.log("Login Success");
            })
            .catch((error) => {
                if (error.code === "auth/user-disabled") {
                    setAlert("Your account is Banned");
                } else if (error.code === "auth/user-not-found") {
                    setAlert("Account not Found");
                } else if (error.code === "auth/wrong-password") {
                    setAlert("Password is Incorrect");
                } else if (error.code === "auth/invalid-email") {
                    setAlert("Invalid Email");
                } else if (error.code === "auth/too-many-requests") {
                    setAlert("Too many fail attempts. Try again later");
                } else {
                    setAlert("Unknown Error");
                }
            });
    };

    useEffect(() => {
        const clearMessage = setTimeout(() => {
            setAlert("");
        }, 3000);

        return () => {
            clearTimeout(clearMessage);
        };
    }, [alert]);

    return (
        <form className="login-form" onSubmit={login}>
            <div>Welcome back!</div>
            <div>We've missed you!</div>
            <div>
                <label htmlFor="login-email">EMAIL ADDRESS</label>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="login-email"
                        required
                        minLength={4}
                    ></input>
                </div>
            </div>
            <div>
                <label htmlFor="login-password">PASSWORD</label>
                <div>
                    <input
                        type="password"
                        name="password"
                        id="login-password"
                        required
                        minLength={6}
                    ></input>
                </div>
            </div>
            <div className="login-buttons">
                <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault();
                        props.setAccount(false);
                    }}
                >
                    Register
                </button>
                <button type="submit">Login</button>
            </div>
            <div className="alert-modal">{alert}</div>
        </form>
    );
};

export default LoginForm;
