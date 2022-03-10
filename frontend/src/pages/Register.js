import React from 'react';
import { Link, Navigate } from 'react-router-dom'

import { ConnectionNavbar } from './Navbar';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            name: '',
            nickname: '',
            email: '',
            password: '',
            popup_msg: 'Registration failed',
            redirect: false
        };
        this.validateFormRegister = this.validateFormRegister.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    }

    componentDidMount() {
        /*const { navigation } = this.props;
        this.state.email = navigation.getParam('email');*/
    }

    validateFormRegister() {
        let firstname = this.state.firstname;
        let name = this.state.name;
        let nickname = this.state.nickname;
        let email = this.state.email;
        let password = this.state.password;
        return firstname.length > 0 && name.length > 0 && nickname.length > 0 && email.length > 0 && password.length > 0 && email.indexOf('@') >= 0 && email.split('@').length === 2;
    }

    handleSubmitRegister(event) {
        event.preventDefault();

        let register_body = {
            firstname: this.state.firstname,
            name: this.state.name,
            nickname: this.state.nickname,
            email: this.state.email,
            password: this.state.password
        };

        fetch('http://localhost:5001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(register_body),
            responseType: 'json'
        }).then((response) => {
            response.text().then(text => {
                let token = JSON.parse(text).token;
                if (token) {
                    localStorage.setItem('user_token', token);
                    this.setState({ redirect: true });
                } else {
                    if (JSON.parse(text).msg === 'internal server error (bad entries)')
                        this.setState({ popup_msg: 'Bad entries' });
                    if (JSON.parse(text).msg === 'accound already exists')
                        this.setState({ popup_msg: 'Account already exists' });
                    toast.error(this.state.popup_msg, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({ firstname: '' });
                    this.setState({ name: '' });
                    this.setState({ nickname:  '' });
                    this.setState({ email: '' });
                    this.setState({ password: '' });
                }
            })
        })
    }

    render() {
        if (this.state.redirect)
            return <Navigate to='/' />
        return(
            <div className='w-screen h-screen mx-auto text-white background'>
                <ConnectionNavbar />
                <div className='bg-[#141414] w-1/3 p-4 login_panel flex items-center justify-center'>
                    <div className='w-5/6'>
                        <form onSubmit={this.handleSubmitRegister} className='pb-5' >
                            <div className='flex space-x-2'>
                                <input id='firstname_register' value={this.state.firstname} onChange={(e) => this.setState({ firstname: e.target.value })} type='text' placeholder='Firstname' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                                <input id='name_register' value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} type='text' placeholder='Name' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            </div>
                            <input id='nickname_register' value={this.state.nickname} onChange={(e) => this.setState({ nickname: e.target.value })} type='text' placeholder='Nickname' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            <input id='email_register' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type='email' placeholder='Email' className='w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            <input id='password_login' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type='password' placeholder='Password' className=' w-full border-2 focus:outline-none border-white bg-transparent p-4 rounded-lg mb-5' required />
                            <input type='submit' value='Create account' disabled={!this.validateFormRegister()} className='w-full disabled:from-[#3d3d3d] disabled:to-[#222222] rounded-lg bg-gradient-to-r transition hover:duration-300 hover:scale-105 from-[#d71f26] to-[#8b1418] p-4 focus:outline-none hover:from-[#d15156] hover:to-[#d71f26] ring-white active:ring-2' />
                        </form>
                        <p>
                            Already a member ? <Link to='/login' className='text-blue-500'>Log in</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer toastStyle={{ backgroundColor: '#141414', color: '#FFFFFF' }} />
            </div>
        );
    }
}

export default Register;