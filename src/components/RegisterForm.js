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
            <div>Create an Account!</div>
            <div>Join us Today!</div>
            <div>
                <label>EMAIL ADDRESS</label>
                <div>
                    <input type="email" name="email" required minLength={4} />
                </div>
            </div>
            <div>
                <label>USERNAME</label>
                <div>
                    <input
                        type="text"
                        name="username"
                        required
                        minLength={3}
                        maxLength={15}
                    />
                </div>
            </div>
            <div>
                <label>PASSWORD</label>
                <div>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={6}
                    />
                </div>
            </div>
            <div className="login-buttons">
                <button type="submit">Register</button>
                <button
                    type="button"
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