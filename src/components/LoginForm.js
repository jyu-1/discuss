const LoginForm = (props) => {
    return (
        <div className="login-form">
            <div>Login</div>
            <div>Email Address</div>
            <input></input>
            <div>Password</div>
            <input></input>
            <div>
                <button>Login</button>
                <button
                    onClick={() => {
                        props.setAccount(false);
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
