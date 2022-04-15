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
            filter: '*',
            redirect_to_movie: false,
            movie_id_selected: -1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitMovie = this.handleSubmitMovie.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            let tvshow_body = {
                type: "TV Show"
            };

            fetch("http://0.0.0.0:5001/films/type", {
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

            fetch('http://0.0.0.0:5001/films/genre', {
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

    handleSubmitMovie(event, id) {
        event.preventDefault();
        this.setState({ movie_id_selected: id });
        this.setState({ redirect_to_movie: true });
    }

    render () {
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />;
        if (this.state.redirect_to_movie)
            return <Navigate to={`/movie/${this.state.movie_id_selected}`} />;
        return (
            <div className='text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='m-4'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl grid place-items-center'>TV Shows</h1>
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
                <div id='movies' className='pb-10 flex flex-wrap justify-center space-x-5 space-y-5'>
                    {this.state.tvshows.map(tvshow => (
                        <button onClick={e => this.handleSubmitMovie(e, tvshow.id)} iv className='mt-4 ml-4 hover:opacity-50'>
                            <h1 className='text-lg truncate w-52'>{tvshow.title}</h1>
                            <img className='object-cover w-56 h-80 rounded-lg' src={tvshow.picture} alt={String(tvshow.show_id)} />
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}
