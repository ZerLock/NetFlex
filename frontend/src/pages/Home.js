import React from 'react';
// import { Link } from 'react-router-dom';

import isConnected from '../js/isConnected';

import { HomeNavbar } from './Navbar';
import { NotConnected } from './Notconnected';
import { Loggedin } from './Loggedin';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: true};
    }

    componentDidMount() {
        this.setState({ isLoggedIn: isConnected() });
    }

    render() {
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                { this.state.isLoggedIn ?
                <Loggedin />:
                <NotConnected /> }
            </div>
        );
    }
}
