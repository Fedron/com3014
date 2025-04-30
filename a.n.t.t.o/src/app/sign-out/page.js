'use client'

import { useEffect } from 'react';

export default function SignOut() {
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userId', 0);
            localStorage.setItem('userFirstName', '');
            localStorage.setItem('userLastName', '');
            localStorage.setItem('token', '');
        }
        window.location.href = '/';
    })
}