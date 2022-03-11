import React from 'react';
import { isExpired } from 'react-jwt';

import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import search from '../assets/search.png';

export function HomeNavbar() {

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

    return (
        <nav className='flex items-center p-4 bg-[#202020]' >
            <Link to="/">
                <img className='h-10' src={logo} alt='logo' />
            </Link>
            <ul className='ml-auto flex items-center space-x-4'>
                <li>
                    <input type='text' disabled={!isConnected()} placeholder="Search" className='w-80 px-2 focus:outline-none border-b-2 placeholder-white-600 border-white bg-transparent' />
                </li>
                <li>
                    <button disabled={!isConnected()} className='transition hover:-transition-y-1 hover:duration-300 hover:scale-110 ease-in-out' >
                        <img alt='search button' src={search} className='h-6' />
                    </button>
                </li>
                <Link to='/'>
                <li>
                    <button href='/'>Browse</button>
                </li>
                </Link>
                <Link to='/login'>
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