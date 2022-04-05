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
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
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
                .then(data => this.setState({ user: data }));
        }
    }

    handleSubmitDeconnection(event) {
        event.preventDefault();
        this.setState({ isLoggedIn: false });
        localStorage.removeItem('user_token');
    }

    handleSubmitDelete(event) {
        event.preventDefault();
        console.log("delete");
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to="/login" />;
        return (
            <div className='w-screen background h-screen mx-auto text-white text-2xl bg-[#141414]'>
                <ConnectionNavbar />
                <div className='grid place-items-center not_connected'>
                    <div className='p-5 bg-[#303030] h-2/3 w-1/4 rounded-lg'>
                        <div className='grid place-items-center'>
                            <h1>Welcome back, {this.state.user.nickname} !</h1>
                            <h1>Firstname : {this.state.user.firstname}</h1>
                            <h1>Name : {this.state.user.name}</h1>
                            <h1>Email : {this.state.user.email}</h1>

                            <div className='grid grid-cols-2 space-x-5'>
                                <button onClick={this.handleSubmitDeconnection} className='px-5 py-3 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]'>
                                    Deconnection
                                </button>
                                <button onClick={this.handleSubmitDelete} className='px-5 py-3 rounded-lg bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Myaccount;