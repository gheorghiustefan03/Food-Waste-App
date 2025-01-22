import './Login.css'

const Login = () => {
    return(
        <div className="container">
        <div>
            <h1>Login</h1>
            <form action="">
                <div>
                    <input type="email" className=""/>
                    <label htmlFor=''>Email</label>
                </div>
                <div>
                    <input type="password" />
                    <label htmlFor=''>Password</label>
                </div>
                <button type="submit">Login</button>
                <div>
                    <span>New Here? Create an Account</span>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login