const Register = () => {
    return(
        <div className="container">
        <div>
            <h1>Register</h1>
            <form action="">
                <div>
                    <input type="email" className=""/>
                    <label htmlFor=''>Email</label>
                </div>
                <div>
                    <input type="text" className=""/>
                    <label htmlFor=''>First name</label>
                </div>
                <div>
                    <input type="text" className=""/>
                    <label htmlFor=''>Last name</label>
                </div>
                <div>
                    <input type="password" />
                    <label htmlFor=''>Password</label>
                </div>
                <button type="submit">Register</button>
                <div>
                    <span>Already have an account? Log In</span>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Register