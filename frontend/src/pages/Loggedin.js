import React from 'react';
import { Link } from 'react-router-dom';

export class Loggedin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            tv_shows: []
        };
    }

    componentDidMount() {
        let movie_body = {
            type: 'Movie'
        }

        let tv_show_body = {
            type: 'TV Show'
        }

        fetch('http://localhost:5001/films/type', {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(movie_body)
        })
        .then(response => response.json())
        .then(movies => this.setState({ movies: movies }));

        fetch('http://localhost:5001/films/type', {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
            body: JSON.stringify(tv_show_body)
        })
        .then(response => response.json())
        .then(tv_shows => this.setState({ tv_shows: tv_shows }));
    }

    render() {
        return (
            <div className='overflow-hidden p-5 text-white mx-auto not_connected items-center justify-center'>
                {/* Movies */}
                <div className='flex flex-row align-bottom'>
                    <h1 className='text-2xl'>Movies</h1>
                    <Link to='/movies' className='ml-auto'>
                        <button className='text-red-600 ml-auto transition hover:scale-110'>See all <span className='text-3xl pb-1'> > </span></button>
                    </Link>
                </div>
                <div className='child flex space-x-5 pt-3 px-6'>
                    {this.state.movies.map(movie => (
                        <>
                            <div key={movie.show_id} className='flex-shrink-0 transition hover:scale-110'>
                                <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                                <img alt={String(movie.show_id)} className='object-contain w-30 h-80' src={movie.picture} />
                            </div>
                        </>
                    ))}
                </div>

                {/* Tv_Shows */}
                <div className='flex flex-row align-bottom pt-5'>
                    <h1 className='text-2xl'>TV Shows</h1>
                    <Link to='/tvshows' className='ml-auto'>
                        <button className='text-red-600 transition hover:scale-110'>See all <span className='text-3xl pb-1'> > </span></button>
                    </Link>
                </div>
                <div className='child flex space-x-5 pt-3 px-6'>
                    {this.state.tv_shows.map(tv_show => (
                        <>
                            <div key={tv_show.show_id} className='flex-shrink-0 transition hover:scale-110'>
                                <h1 className='text-lg truncate w-52'>{tv_show.title}</h1>
                                <img alt={String(tv_show.show_id)} className='object-contain w-30 h-80' src={tv_show.picture} />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        );
    }
}
