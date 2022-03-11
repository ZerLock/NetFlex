import React from 'react';
import { HomeNavbar } from './Navbar';

export default class Tvshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvshows: [],
            filter: 'Genre'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ filter: event.target.value });
    }

    render () {
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='m-4'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl'>TV Shows</h1>
                        <select className='bg-transparent border-2 rounded ml-5 p-2 h-12' value={this.state.filter} onChange={this.handleChange}>
                            <option value=''>Genre</option>
                            <option value='action'>Action</option>
                            <option value='adventure'>Adventure</option>
                            <option value='romantic'>Romantic</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
