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
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <form className="login-form" onSubmit={login}>
            <div>Login</div>
            <div>Email Address</div>
            <input
                type="email"
                placeholder="Email"
                name="email"
                required
                minLength={4}
            ></input>
            <div>Password</div>
            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                minLength={6}
            ></input>
            <div>
                <button type="submit">Login</button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.setAccount(false);
                    }}
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
