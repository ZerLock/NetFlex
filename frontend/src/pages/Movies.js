import React from 'react';
import isConnected from '../js/isConnected';

import { Navigate } from 'react-router-dom';

import { HomeNavbar } from './Navbar';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected()
        }
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <h1>MOVIES</h1>
            </div>
        );
    }
}