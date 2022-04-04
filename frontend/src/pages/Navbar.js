import React, {useState} from 'react';
import { isExpired } from 'react-jwt';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import search from '../assets/search.png'

export function HomeNavbar() {

    const [search_str, setSearch] = useState('');

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

    const navigate = useNavigate();
    function handleSubmit(event)
    {
        event.preventDefault();
        if (search_str.length > 0)
            navigate(`/browse/${search_str}`);
    }

    function handleChange(event)
    {
        setSearch(event.target.value);
    }

    return (
        <nav className='flex items-center p-4 bg-[#202020]' >
            <Link to="/">
                <img className='h-10' src={logo} alt='logo' />
            </Link>
            <ul className='ml-6 flex items-center space-x-4'>
                <Link to='/movies'>
                    <li className='transition hover:scale-110'>
                        <button>Movies</button>
                    </li>
                </Link>
                <Link to='/tvshows'>
                    <li className='transition hover:scale-110'>
                        <button>TV Shows</button>
                    </li>
                </Link>
                <Link to='mylist'>
                    <li className='transition hover:scale-110'>
                        <button>My List</button>
                    </li>
                </Link>
            </ul>
            <ul className='ml-auto flex items-center space-x-4'>
                <li>
                    <input type='text' onChange={handleChange} disabled={!isConnected()} placeholder="Search" className='w-80 px-2 focus:outline-none border-b-2 placeholder-white-600 border-white bg-transparent' />
                </li>
                <li>
                    <button onClick={handleSubmit} disabled={!isConnected()} className='transition hover:-transition-y-1 hover:duration-300 hover:scale-110 ease-in-out' >
                        <img alt='search button' src={search} className='h-6' />
                    </button>
                </li>
                <Link to='/browse/*'>
                    <li>
                        <button href='/browse'>Browse</button>
                    </li>
                </Link>
                <Link to='/account'>
                    <li>
                        <button className='bg-[#404040] rounded-lg p-2 px-4 hover:bg-[#505050] ring-white active:bg-[#353535]' >
                            {!isConnected() ? "Sign In" : "Account"}
                        </button>
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