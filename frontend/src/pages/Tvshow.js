import React from 'react';
import { HomeNavbar } from './Navbar';

import isConnected from '../js/isConnected';

import { Navigate } from 'react-router-dom';

export default class Tvshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected(),
            tvshows: [],
            ancian_filter: '*',
            filter: '*'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            let tvshow_body = {
                type: "TV Show"
            };

            fetch("http://localhost:5001/films/type", {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }),
                mode: "cors",
                body: JSON.stringify(tvshow_body)
            })
            .then(response => response.json())
            .then(tvshow => {
                this.setState({ tvshows: tvshow });
            });
        }
    }

    componentDidUpdate() {
        if (this.state.ancian_filter !== this.state.filter) {
            console.log(this.state.filter);

            let body = {
                genre: this.state.filter,
                type: "TV Show"
            };

            fetch('http://localhost:5001/films/genre', {
                method: 'POST',
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }),
                mode: "cors",
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(tvshow => {
                this.setState({ ancian_filter: this.state.filter });
                this.setState({ tvshows: tvshow });
            });
        }
    }

    handleChange(event) {
        this.setState({ filter: event.target.value });
    }

    render () {
        console.log(this.state.tvshows);
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />;
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='m-4'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl'>TV Shows</h1>
                        <select className='bg-transparent border-2 rounded ml-5 p-2 h-12' value={this.state.filter} onChange={this.handleChange}>
                            <option value='*'>Genre</option>
                            <option value='kid'>Kid's TV</option>
                            <option value='anime'>Anime</option>
                            <option value='crime'>Crime</option>
                            <option value='comedies'>Comedies</option>
                            <option value='dramas'>Dramas</option>
                            <option value='romantic'>Romantic</option>
                            <option value='docuseries'>Docuseries</option>
                            <option value='reality'>Reality</option>
                            <option value='horro'>Horror</option>
                        </select>
                    </div>
                </div>
                <div id='movies' className='grid grid-cols-5 w-screen'>
                    {this.state.tvshows.map(tvshow => (
                        <div className='flex-shrink-0'>
                            <h1 className='text-lg truncate w-52'>{tvshow.title}</h1>
                            <img className='object-cover w-56 h-80' src={tvshow.picture} alt={String(tvshow.show_id)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
