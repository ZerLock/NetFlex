import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom'
import '../index.css'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validateForm() {
        return email.length > 0 && password.length > 0 && email.indexOf('@') >= 0 && email.split('@').length === 2;
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }

    return(
        <div className='w-screen h-screen mx-auto text-white background'>
            <nav className='flex items-center p-4 bg-[#202020]'>
                <Link to="/">
                    <img className='h-10' src={logo} alt='logo' />
                </Link>
            </nav>
            <div className='bg-[#141414] w-1/3 p-4 login_panel flex items-center justify-center'>
                <div className='w-5/6'>
                    <form onSubmit={handleSubmit} className='pb-5' >
                        <input id='email_login' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                        <input id='password_login' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' className=' w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                        <input type='submit' value='Sign in' disabled={!validateForm()} className='w-full disabled:from-[#3d3d3d] disabled:to-[#222222] rounded-lg bg-gradient-to-r transition hover:duration-300 hover:scale-105 from-[#d71f26] to-[#8b1418] p-4 focus:outline-none hover:from-[#d15156] hover:to-[#d71f26] ring-white active:ring-2' />
                    </form>
                    <p>
                        Not registered yet ? <Link to='/register' className='text-blue-500'>Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;