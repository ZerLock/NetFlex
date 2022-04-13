import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import isConnected from '../js/isConnected';

export class Loggedin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            tv_shows: [],
            redirect_to_movie: false,
            movie_id_selected: -1,
        };
        this.handleSubmitMovie = this.handleSubmitMovie.bind(this);
    }

    handleSubmitMovie(event, id) {
        event.preventDefault();
        this.setState({ movie_id_selected: id });
        this.setState({ redirect_to_movie: true });
    }

    componentDidMount() {

        if(isConnected()) {
            let movie_body = {
                type: 'Movie'
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
                body: JSON.stringify(tv_show_body)
            })
            .then(response => response.json())
            .then(tv_shows => this.setState({ tv_shows: tv_shows }));
        }
    }

    render() {
        if (this.state.redirect_to_movie)
            return <Navigate to={`/movie/${this.state.movie_id_selected}`} />
        return (
            <div className='p-5 text-white not_connected items-center justify-center'>
                {/* Movies */}
                <div className='flex mt-4 flex-row align-bottom '>
                    <h1 className='text-2xl'>Movies selection</h1>
                    <Link to='/movies' className='ml-auto'>
                        <button title='See all movies' className='text-red-600 ml-auto transition hover:scale-110'>See all <span className='text-3xl pb-1'> > </span></button>
                    </Link>
                </div>
                <div className='mx-10 pt-1'>
                    <Swiper slidesPerView={7} >
                        {this.state.movies.map(movie => (
                            <SwiperSlide key={movie.show_id} className='flex-shrink-0'>
                                <button className='hover:opacity-50' onClick={e => this.handleSubmitMovie(e, movie.id)} title={movie.title}>
                                    <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                                    <img alt={String(movie.show_id)} className='object-cover w-56 h-80 rounded-lg' src={movie.picture} />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Tv_Shows */}
                <div className='flex mt-5 flex-row align-bottom pt-4'>
                    <h1 className='text-2xl'>TV Shows selection</h1>
                    <Link to='/tvshows' className='ml-auto'>
                        <button title='See all tv shows' className='text-red-600 transition hover:scale-110'>See all <span className='text-3xl pb-1'> > </span></button>
                    </Link>
                </div>
                <div className='mx-10 pt-1'>
                    <Swiper slidesPerView={7}>
                        {this.state.tv_shows.map(tv_show => (
                            <SwiperSlide key={tv_show.show_id}  className='flex-shrink-0'>
                                <button className='hover:opacity-50' onClick={e => this.handleSubmitMovie(e, tv_show.id)} title={tv_show.title}>
                                    <h1 className='text-lg truncate w-52'>{tv_show.title}</h1>
                                    <img className='object-cover w-56 h-80 rounded-lg' src={tv_show.picture} alt={String(tv_show.show_id)} />
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        );
    }
}
