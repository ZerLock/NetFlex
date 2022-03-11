import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import get_started from '../assets/get_started.png';

export function NotConnected() {

    const [email, setEmail] = useState('');

    let navigate = useNavigate();
    function isValidForm() {
        return email.length > 0 && email.indexOf('@') >= 0 && email.split('@').length === 2;
    }

    function handleSumbitForm(event) {
        event.preventDefault();

        if (isValidForm()) {
            localStorage.setItem('user_email_from_notconnected', email);
            navigate('/register');
        }
    }

    return (
        <div className='w-full text-white mx-auto not_connected flex flex-col items-center justify-center background backdrop-blur-lg'>
            <h1 className='text-6xl w-1/3 text-center pb-5'>Unlimited movies, TV shows, and more.</h1>
            <h2 className='text-2xl pb-5'>Watch anywhere. Cancel anytime.</h2>
            <h2 className='text-xl pb-5'>Ready to watch? Enter your email to create or restart your membership </h2>
            <form class='flex flex-row' onSubmit={handleSumbitForm}>
                <input className='w-[30em] px-5 py-6 bg-white text-black' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' required />
                <button id='get_started_button' className='py-6 px-10 flex flex-row-reverse bg-gradient-to-r from-[#d71f26] to-[#8b1418] hover:from-[#d15156] hover:to-[#d71f26]' >
                    <img alt='fusee' className='w-8 h-8 ml-2' src={get_started} />
                    <span className='text-xl'>Get Started</span>
                </button>
            </form>
        </div>
    );
}