import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database, auth } from "../firebase";

const RegisterForm = (props) => {
    const register = async (event) => {
        event.preventDefault();
        await createUserWithEmailAndPassword(
            auth,
            event.target.email.value,
            event.target.password.value
        )
            .then((userCredential) => {
                set(ref(database, "user/" + userCredential.user.uid), {
                    displayName: event.target.username.value,
                    photoURL:
                        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <form className="login-form" onSubmit={register}>
            <div>Register</div>
            <div>Email Address</div>
            <input
                type="email"
                placeholder="Email"
                name="email"
                required
                minLength={4}
            />
            <div>Username</div>
            <input
                type="text"
                placeholder="Username"
                name="username"
                required
                minLength={3}
                maxLength={15}
            />
            <div>Password</div>
            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                minLength={6}
            />
            <div>
                <button type="submit">Register</button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.setAccount(true);
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
