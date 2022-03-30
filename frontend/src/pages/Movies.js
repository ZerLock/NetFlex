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
            movies: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            let movie_body = {
                type: "Movie"
            };

            fetch("http://localhost:5001/films/type", {
                method: "POST",
                headers: new Headers({
                    "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }),
                mode: "cors",
                body: JSON.stringify(movie_body)
            })
            .then(response => response.json())
            .then(movies => {
                this.setState({ movies: movies });
            });
        }
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
                    <div id='movies' className='grid grid-cols-5 w-screen'>
                        {this.state.movies.map(movie => (
                            <div className='flex-shrink-0'>
                                <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                                <img className='object-cover w-56 h-80' src={movie.picture} alt={String(movie.show_id)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}