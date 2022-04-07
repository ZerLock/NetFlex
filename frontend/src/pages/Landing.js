import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectionNavbar } from './Navbar';

export default function Landing()
{
    let navigate = useNavigate();
    function handleButtonLandingPage() {
        navigate('/');
    }

    return (
        <div className='landing_page w-screen h-screen mx-auto text-white bg-[#141414]'>
            <ConnectionNavbar />
            <div className='grid place-items-center mt-64'>
                <h1 className='text-8xl font-bold'>Lost your way ?</h1>
                <h1 className='mt-12 text-4xl text-center w-[70rem]'>Sorry, we can't find that page. You'll find lots to explore on the home page.</h1>
                <button title='Back to home' onClick={handleButtonLandingPage} className='bg-white rounded p-5 text-black text-2xl mt-12 hover:bg-gray-300 hover:opacity-70'>Netflex Home</button>
            </div>
        </div>
    );
}
