const LoginPage = () => {
    return (
        <div className='login-container'>
            <h2 className='form-title'>Login with</h2>
            <div className='social-login'>
                <button className='social-button'>
                    <img src='/google.svg' alt='Google' className='social-icon' />
                </button>
                <button className='social-button'>
                    <img src='/apple.svg' alt='Apple' className='social-icon' />
                    Apple
                </button>
        </div>
        <p className='separator'><span>or</span></p>

        <form action='#' className='login-form'>
            <div className='input-wrapper'>
                <input type='email' placeholder='Email'
                className='input-field' required />
                <i className='material-symbols-rounded'>mail</i>
            </div>

            <div className='input-wrapper'>
                <input type='password' placeholder='Password'
                className='input-field' required />
                <i className='material-symbols-rounded'>lock</i>
            </div>
            <a href='#' className='forgot-password'>Forgot password?</a>

            <button className='login-button'>Login</button>
        </form>

        <p className='signup-text'>Don&apos;t have an account?
            <a href='#' className='signup-link'>Sign up</a>
        </p>
    </div>
    )
}

export default LoginPage