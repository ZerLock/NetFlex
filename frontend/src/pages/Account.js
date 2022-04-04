import React from 'react';
import isConnected from '../js/isConnected';
import { Navigate } from 'react-router-dom';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected()
        };
    }

    render() {
        if (this.state.isLoggedIn)
            return <Navigate to="/myaccount" />;
        else
            return <Navigate to="/login" />;
    }

}

export default Account;