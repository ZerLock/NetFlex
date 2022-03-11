import React from 'react';

import isConnected from '../js/isConnected';

import { Navigate } from 'react-router-dom';

import { HomeNavbar } from './Navbar';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected(),
            filter: 'Genre',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='m-4'>
                    <div className='flex flex-row'>
                        <h1 className='text-4xl'>Movies</h1>
                        <select className='bg-transparent h-12 ml-5 border-2 rounded p-2' value={this.state.filter} onChange={this.handleChange}>
                            <option value=''>Genre</option>
                            <option value='action'>Action</option>
                            <option value='adventure'>Adventure</option>
                            <option value='romantic'>Romantic</option>
                        </select>
                    </div>
                    <div id='movies' className='m-2'>
                        <h1 className='text-8xl'>Bonsoir je suis un film</h1>
                    </div>
                </div>
            </div>
        );
    }
}