import React from 'react';
import { HomeNavbar } from './Navbar';

export default class Tvshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: []
        };
    }

    render () {
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <h1>TV SHOW</h1>
            </div>
        );
    }
}
