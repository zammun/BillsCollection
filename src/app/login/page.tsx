const LoginPage = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-slate-800'>
            <div className='max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg'>
                <h2 className='text-center text-2xl font-semibold mb-6'>Login with</h2>
                <div className='flex gap-4 mb-6'>
                    <button className='flex items-center justify-center w-full py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200'>
                        <img src='/google.svg' alt='Google' className='w-6 h-6 mr-2' />
                        Google
                    </button>
                    <button className='flex items-center justify-center w-full py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200'>
                        <img src='/apple.svg' alt='Apple' className='w-6 h-6 mr-2' />
                        Apple
                    </button>
                </div>
                <p className='text-center text-gray-500 mb-6'>or</p>
                <form action='#' className='space-y-4'>
                    <div className='relative'>
                        <input type='email' placeholder='Email' className='w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
                        <i className='material-symbols-rounded absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>mail</i>
                    </div>
                    <div className='relative'>
                        <input type='password' placeholder='Password' className='w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
                        <i className='material-symbols-rounded absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>lock</i>
                    </div>
                    <a href='#' className='text-sm text-indigo-500 hover:underline block text-right'>Forgot password?</a>
                    <button className='w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600'>Login</button>
                </form>
                <p className='text-center text-gray-500 mt-6'>Don&apos;t have an account?
                    <a href='#' className='text-indigo-500 hover:underline ml-1'>Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;