import React from 'react';

import isConnected from '../js/isConnected';

import { Navigate } from 'react-router-dom';

import { HomeNavbar } from './Navbar';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: isConnected(),
            ancian_filter: '*',
            filter: '*',
            movies: [],
            redirect_to_movie: false,
            movie_id_selected: -1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitMovie = this.handleSubmitMovie.bind(this);
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            let movie_body = {
                type: "Movie",
                genre: this.state.filter
            };

            fetch("http://0.0.0.0:5001/films/type", {
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

    componentDidUpdate() {
        if (this.state.ancian_filter !== this.state.filter) {
            console.log(this.state.filter);

            let body = {
                genre: this.state.filter,
                type: "Movie"
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
            .then(movies => {
                this.setState({ ancian_filter: this.state.filter });
                this.setState({ movies: movies });
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

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />
        if (this.state.redirect_to_movie)
            return <Navigate to={`/movie/${this.state.movie_id_selected}`} />
        return (
            <div className='text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='m-4'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl grid place-items-center'>Movies</h1>
                        <select className='bg-transparent h-12 ml-5 border-2 rounded p-2' value={this.state.filter} onChange={this.handleChange}>
                            <option value='*'>Genre</option>
                            <option value='action'>Action</option>
                            <option value='adventure'>Adventure</option>
                            <option value='sci-fi'>Sci-Fi</option>
                            <option value='fantasy'>Fantasy</option>
                            <option value='family'>Family</option>
                            <option value='dramas'>Dramas</option>
                            <option value='romantic'>Romantic</option>
                            <option value='comedies'>Comedies</option>
                            <option value='cult'>Cult</option>
                            <option value='spirituality'>Spirituality</option>
                        </select>
                    </div>
                </div>
                <div id='movies' className='pb-10 flex flex-wrap justify-center space-x-5 space-y-5'>
                    {this.state.movies.map(movie => (
                        <button onClick={e => this.handleSubmitMovie(e, movie.id)} className='mt-4 ml-4 hover:opacity-50'>
                            <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                            <img className='object-cover w-56 h-80 rounded-lg' src={movie.picture} alt={String(movie.show_id)} />
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}