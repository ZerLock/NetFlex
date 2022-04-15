import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import isConnected from '../js/isConnected';
import { HomeNavbar } from './Navbar';


class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search_str: '',
            result: [],
            redirect_to_movie: false,
            movie_id_selected: -1,
            isLoggedIn: isConnected(),
        };
    }

    componentDidMount() {
        const { search } = this.props.params;

        this.setState({ search_str: search });

        if (this.state.isLoggedIn) {

            let search_body = {
                search: search
            }

            console.log(JSON.stringify(search_body));

            fetch('http://0.0.0.0:5001/films/browse', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json'
                }),
                mode: 'cors',
                body: JSON.stringify(search_body)
            })
            .then(response => response.json())
            .then(movies => {
                this.setState({ result: movies });
                console.log(movies);
            });
        }
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
            return <Navigate to={`/movie/${this.state.movie_id_selected}`}  />
        return (
            <div className='mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <h1 className='m-5 text-2xl'>Results for : {this.state.search_str}</h1>
                <div className='flex flex-wrap justify-center pb-10 items-center space-y-10 space-x-10'>
                    {this.state.result.map(movie => (
                        <div className='hover:opacity-50'>
                            <button onClick={e => this.handleSubmitMovie(e, movie.id)} title={movie.title}>
                                <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                                <img className='object-cover w-56 h-80 rounded' src={movie.picture} alt={String(movie.show_id)} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default (props) => (
    <Browse
        {...props}
        params={useParams()}
    />
);