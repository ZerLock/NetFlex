import React, {useEffect, useState} from 'react';
import { isExpired } from 'react-jwt';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import search from '../assets/search.png'

export function HomeNavbar() {

    const [search_str, setSearch] = useState('');
    const [image_url, setImageUrl] = useState('');

    function isConnected() {
        if (!localStorage.getItem('user_token')) {
            return (false);
        } else {
            const isTokenExpired = isExpired(localStorage.getItem('user_token'));
            if (isTokenExpired)
            return (false);
            else
            return (true);
        }
    }

    useEffect(() => {
        if (isConnected()) {
            fetch('http://localhost:5001/user', {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            })
            .then(response => response.json())
            .then(image_url => setImageUrl(image_url.image_url));
        }
    });

    const navigate = useNavigate();
    function handleSubmit(event)
    {
        if (search_str.length > 0) {
            navigate(`/browse/${search_str}`);
            window.location.reload();
        }
    }

    function handleChange(event)
    {
        setSearch(event.target.value);
    }

    return (
        <nav className='flex items-center p-4 bg-[#202020]' >
            <div className='mr-10'>
                <Link to="/">
                    <img className='h-10' src={logo} alt='logo' />
                </Link>
            </div>
            <ul className='ml-6 flex items-center space-x-12'>
                <Link to='/movies'>
                    <li className='transition hover:scale-110'>
                        <button title='See all movies'>Movies</button>
                    </li>
                </Link>
                <Link to='/tvshows'>
                    <li className='transition hover:scale-110'>
                        <button title='See all tv shows'>TV Shows</button>
                    </li>
                </Link>
            </ul>
            <ul className='ml-auto flex items-center space-x-4'>
                <form className='ml-auto flex items-center spaxe-x-4'>
                    <li className='mr-4'>
                        <input type='text' onChange={handleChange} disabled={!isConnected()} placeholder="Search" className='w-80 px-2 focus:outline-none border-b-2 placeholder-white-600 border-white bg-transparent' />
                    </li>
                    <li>
                            <button title='Search movie and tv show' onClick={handleSubmit} disabled={!isConnected()} className='transition hover:-transition-y-1 hover:duration-300 hover:scale-110 ease-in-out' >
                                <img alt='search button' src={search} className='h-7' />
                            </button>
                    </li>
                </form>
                <Link to='/browse/*'>
                    <li>
                        <button title='See all movies and tv shows' >Browse</button>
                    </li>
                </Link>
                <Link to='/account'>
                    <li>
                        {!isConnected() ?
                                <button title='Sign into NetFlex' className='bg-[#404040] rounded-lg p-2 px-4 hover:bg-[#505050] ring-white active:bg-[#353535]' >Sign In</button>
                        :
                                <button title='Account settings'>
                                    <img className='flex h-8' alt='user profile' src={image_url} />
                                </button>
                        }
                    </li>
                </Link>
            </ul>
        </nav>
    );
}

export function ConnectionNavbar() {
    return (
        <nav className='flex items-center p-4 bg-[#202020]'>
            <Link to="/">
                <img className='h-10' src={logo} alt='logo' />
            </Link>
        </nav>
    );
}