import React from 'react';

import isConnected from '../js/isConnected';
import { Navigate } from 'react-router-dom';
import { ConnectionNavbar } from './Navbar';

class Myaccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected(),
            user: []
        };
        this.handleSubmitDeconnection = this.handleSubmitDeconnection.bind(this);
    }

    componentDidMount() {

        if (this.state.isLoggedIn) {
            fetch('http://localhost:5001/user', {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                        'Content-Type': 'application/json'
                    }),
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({ user: data })
                });
        }
    }

    handleSubmitDeconnection(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: false });
        localStorage.removeItem('user_token');
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to="/login" />;
        return (
            <div className='w-screen h-screen mx-auto text-white text-2xl bg-[#141414]'>
                <ConnectionNavbar />
                <div className='grid place-items-center not_connected'>
                    <div className='p-5 bg-[#303030] h-2/3 w-1/4 rounded-lg'>
                        <div className='grid place-items-center'>
                            <h1>Welcome back, {this.state.user.nickname}!</h1>
                            <h1>Informations !</h1>

                            <button onClick={this.handleSubmitDeconnection} className='px-5 py-3 bg-[#d81f26] rounded-lg'>
                                Deconnection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Myaccount;