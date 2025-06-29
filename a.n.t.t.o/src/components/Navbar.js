
'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';


const Navbar = () => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            if (typeof window !== 'undefined') {
                const loggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false;
                setLoggedIn(loggedIn);
            }
        };
        checkLoggedIn();
    }, []);

    return (
        <header className="h-24 font-heading navbar bg-primary text-primary-content drop-shadow-md w-full z-40">
                        <div className="w-full max-w-[1280px] mx-auto ps-5 top-4 ">
                            <div className="navbar-start">
                                <div className="w-40 fixed left-[30px] top-4 z-10 mx-28">
                                    <a href="/">
                                        <img src="/ANTTO.png" alt="logo"/> 
                                     </a>
                                </div>
                                <h1 className="mx-20 font-heading font-bold text-3xl ">A.N.T.T.O</h1>
                             </div>
        
                            <div className="sm-hidden font-medium lg-flex menu ml-[30rem] ">
                                 <ul className="menu-horizontal ">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/community_list">Communitites</Link></li>
                                   <li><Link href="/events">Events</Link></li>
                               </ul>
                           </div>
        
                            <div className="navbar-end flex ml-28">
                              {isLoggedIn ? (
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex={0} role="button" className="btn m-1 btn-ghost btn-square">
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                                </svg>
                                                <span className="top-0 start-3.5 absolute w-2.5 h-2.5 bg-red-500 rounded-full indicator-item"></span>  
                                            </div>
                                        </div>
                                        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                            {/* <Room /> */}
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="hidden lg:flex">
                                    {isLoggedIn ? (
                                        <div className='my-1'>
                                            <Link href="/profile" className="btn btn-ghost btn-square">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#F1B53D" viewBox="0 -960 960 960" className="w-6 h-6"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="pe-5 flex items-center space-x-2 -ml-16">
                                            <Link href="/sign-in" className="mr-1 font-medium btn btn-sm btn-secondary ">Sign in</Link>
                                            <Link href="/sign-up" className="font-medium btn btn-outline btn-primary-content btn-sm text-base-100">Sign up</Link>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="dropdown dropdown-end flex justify-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-square lg:hidden my-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link href="/home">Home</Link></li>
                                            <li><Link href="/community">Communitites</Link></li>
                                            <li><Link href="/events">Events</Link></li>
                                        <div className="my-1 divider"></div>
                                        {isLoggedIn ? (
                                            <>
                                                <li><Link href="/profile">Profile</Link></li>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-sm btn-secondary text-base-100 w-full">
                                                    <Link href="/sign-in">Sign in</Link>
                                                </button>
                                            </>
                                        )}
                                    </ul>
                                </div>
        
                            </div>
                        </div>
                </header>
            );
}

export default Navbar;
