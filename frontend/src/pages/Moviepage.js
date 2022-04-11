import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import isConnected from '../js/isConnected';
import { HomeNavbar } from './Navbar';

class Moviepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            listedin_split: '',
            redirect_to_home: false,
            redirect_to_landing: false,
        }
    }

    componentDidMount() {
        const {id} = this.props.params;

        if (!isConnected)
            this.setState({ redirect_to_home: true });

        fetch(`http://localhost:5001/films/${id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                'Content-Type': 'application/json'
            }),
            mode: 'cors',
        })
        .then(response => {
            if (!response.ok) {
                this.setState({ redirect_to_landing: true });
            } else {
                response.json()
                .then(movies => {
                    console.log()
                    this.setState({ movie: movies[0] })
                    if (!movies[0]) {
                        this.setState({ redirect_to_landing: true });
                        console.log("landing page return !");
                    }
                    this.setState({ listedin_split: movies[0].listed_in.split(', ') });
                });
            }
        });
    }

    render() {
        if (this.state.redirect_to_home)
            return <Navigate to='/' />
        if (this.state.redirect_to_landing)
            return <Navigate to='/landing' />
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <div className='flex flex-row w-screen'>
                    <div className='informations_movie p-20 space-y-5 text-2xl w-2/3'>
                        <h1 className='text-4xl'>{this.state.movie.title}</h1>
                        <p>{this.state.movie.release_year} | {this.state.movie.rating} | {this.state.movie.type} | {this.state.movie.listed_in}</p>
                        <p className='w-3/4 flex'><p className=''>Description:</p><p className='pl-4 text-justify'>{this.state.movie.description}</p></p>
                        <p className='w-3/4 flex'>
                            <p>Casting:</p>
                            <p className='pl-4 text-justify'>{this.state.movie.cast !== '' ? this.state.movie.cast : 'Not specified'}</p>
                            </p>
                        <p className='w-3/4 flex'>
                            <p>Creators:</p>
                            <p className='pl-4 text-justify'>{this.state.movie.director !== '' ? this.state.movie.director : 'Not specified'}</p>
                        </p>
                    </div>
                    <div className='cover_movie grid place-items-center pt-20 w-1/3'>
                        <img className='w-2/3 cover_picture rounded-xl' alt={this.state.movie.show_id} src={this.state.movie.picture} />
                    </div>
                </div>
            </div>
        );
    }
}

export default (props) => (
    <Moviepage
        {...props}
        params={useParams()}
    />
);