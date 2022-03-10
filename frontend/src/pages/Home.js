import React from 'react';
// import { Link } from 'react-router-dom';
import { isExpired } from 'react-jwt';

import { HomeNavbar } from './Navbar';
import { NotConnected } from './Notconnected';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: true};
    }

    componentDidMount() {
        if (!localStorage.getItem('user_token')) {
            this.setState({isLoggedIn: false});
        } else {
            const isTokenExpired = isExpired(localStorage.getItem('user_token'));
            if (isTokenExpired)
                this.setState({isLoggedIn: false});
        }
    }

    render() {
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                { this.state.isLoggedIn ?
                <h1>Is Logged in</h1> :
                <NotConnected /> }
            </div>
        );
    }
}
