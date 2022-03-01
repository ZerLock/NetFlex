import React from 'react';
import '../index.css'

import logo from '../assets/logo.png';
import search from '../assets/search.png';

class Home extends React.Component {
    render() {
        return (
            <div className='w-screen h-screen mx-auto text-white bg-[#141414]'>
                <nav className='flex items-center p-4 bg-[#303030]' >
                    <img className='h-10' src={logo} alt='logo' />
                    <ul className='ml-auto flex items-center space-x-4'>
                        <li>
                            <input type='text' placeholder="search" className='w-80 px-2 focus:outline-none border-b-2 placeholder-white-600 border-white bg-transparent' />
                        </li>
                        <li>
                            <button className='rounded'>
                                <img alt='search button' src={search} className='h-5 hover:h-6' />
                            </button>
                        </li>
                        <li>
                            <p>Browse</p>
                        </li>
                        <li>
                            <button className='bg-[#404040] rounded-lg p-2 hover:bg-[#505050] ring-white active:bg-[#353535]' >Account</button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Home;