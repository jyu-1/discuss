import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginForm = (props) => {
    const login = async (event) => {
        event.preventDefault();
        await signInWithEmailAndPassword(
            auth,
            event.target.email.value,
            event.target.password.value
        )
            .then((userCredential) => {
                console.log("Sign-in Success");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

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
        </form>
    );
};

export default LoginForm;
