const RegisterForm = (props) => {
    return (
        <div className="login-form">
            <div>Register</div>
            <div>Email Address</div>
            <input />
            <div>Username</div>
            <input />
            <div>Password</div>
            <input />
            <div>
                <button>Register</button>
                <button
                    onClick={() => {
                        props.setAccount(true);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
