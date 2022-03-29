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

            fetch('http://localhost:5001/films/browse', {
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

    render() {
        if (!this.state.isLoggedIn)
            return <Navigate to='/' />
        return (
            <div className='w-screen mx-auto text-white bg-[#141414]'>
                <HomeNavbar />
                <h1>Results for : {this.state.search_str}</h1>
                <div className=''>
                    {this.state.result.map(movie => (
                        <div className='flex-shrink-0'>
                            <h1 className='text-lg truncate w-52'>{movie.title}</h1>
                            <img className='object-cover w-56 h-80' src={movie.picture} alt={String(movie.show_id)} />
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