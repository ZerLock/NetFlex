import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import { ConnectionNavbar } from './Navbar';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { valideEmail } from '../js/regex';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        };
        this.validateFormLogin = this.validateFormLogin.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    validateFormLogin() {
        let email = this.state.email;
        let password = this.state.password;
        return email.length > 0 && password.length > 0 && valideEmail.test(email);
    }

    handleSubmitLogin(event) {
        event.preventDefault();

        let login_body = {
            email: this.state.email,
            password: this.state.password
        };

        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(login_body),
            responseType: 'json'
        }).then((response) => {
            response.text().then(text => {
                let token = JSON.parse(text).token;
                if (token) {
                    localStorage.setItem('user_token', token);
                    this.setState({ redirect: true });
                } else {
                    toast.error('Connection denied', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({ email: '' });
                    this.setState({ password: '' });
                }
            });
        });
    }

    render() {
        if (this.state.redirect)
            return <Navigate to='/' />
        return(
            <div className='w-screen h-screen mx-auto text-white background'>
                <ConnectionNavbar />
                <div className='bg-[#141414] w-1/3 p-4 login_panel flex items-center justify-center'>
                    <div className='w-5/6'>
                        <form onSubmit={this.handleSubmitLogin} className='pb-5' >
                            <input id='email_login' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} type='email' placeholder='Email' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            <input id='password_login' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} type='password' placeholder='Password' className=' w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            <input type='submit' value='Sign in' disabled={!this.validateFormLogin()} className='w-full disabled:from-[#3d3d3d] disabled:to-[#222222] rounded-lg bg-gradient-to-r transition hover:duration-300 hover:scale-105 from-[#d71f26] to-[#8b1418] p-4 focus:outline-none hover:from-[#d15156] hover:to-[#d71f26] ring-white active:ring-2' />
                        </form>
                        <p>
                            Not registered yet ? <Link to='/register' className='text-blue-500'>Create an account</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer toastStyle={{ backgroundColor: '#141414', color: '#FFFFFF' }} />
            </div>
        );
    }
}

export default Login;