import './Register.css';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Register</h1>
                <form className="register-form">
                    <input type="email" className="form-input" placeholder="Email" />
                    <input type="text" className="form-input" placeholder="First Name" />
                    <input type="text" className="form-input" placeholder="Last Name" />
                    <input type="password" className="form-input" placeholder="Password" />
                    <button type="submit" className="register-button">Register</button>
                    <div className="login-prompt">
                        Already have an account? <a href="/login" className="login-link">Log In</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
