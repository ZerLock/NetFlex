import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

export function Footer() {
    return (
        <div className='footer grid grid-cols-3 place-items-center p-5 bg-transparent'>
            <img src={logo} className='h-10' />
            <h1 className=''>Copyright 2022 Léo Dubosclard</h1>
            <div className='grid grid-cols-1'>
                <a href='https://www.linkedin.com/in/leo-dubosclard' target="_blank">
                    Owner's Linkedin
                </a>
                <a href='https://www.github.com/ZerLock' target="_blank">
                    Owner's GitHub
                </a>
                <a href='https://www.github.com/ZerLock/NetFlex' target="_blank">
                    NetFlex GitHub Repository
                </a>
            </div>
        </div>
    );
}