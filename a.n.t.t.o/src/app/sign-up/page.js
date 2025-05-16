'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        try {
            if (password !== confPassword) {
                setError('Confirm Password does not match Password');
                return;
            }

            const userInfo = {
                username: username,
                password: password,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true')
                window.location.href = '/';
            } else {
                setError('Signup failed: ' + (data.message || 'Unknown error'));
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    return (
        <div className="flex w-full my-32 justify-center">
            <div className="image">
                <figure>
                    <img
                        className="mx-28 my-14 max-w-xl max-h-max"
                        src="/images/sign-up_img.png"
                        alt="sign-up_image" />
                </figure>
            </div>
            <div className="divider divider-horizontal h-[25.5rem] divider-neutral mx-20"></div>
            <div className="form mx-36 -my-20">
                <form onSubmit={handleCreateAccount} className="mt-16 font-heading text-primary text-center">
                    <div className="text-lg font-semibold my-8">Sign up</div>
                    <div className="inline-block w-96">
                        <label className="input input-bordered flex items-center gap-4">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-4 my-4">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-4 my-4">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                required
                            />
                        </label>
                        {error && <div className="text-red-500 my-2">{error}</div>}
                        <div className="text-sm mt-4 mb-8 text-center">
                            By signing up, you agree to our&nbsp;
                            <a className="link">Terms of Use</a>&nbsp;and&nbsp;
                            <a className="link">Privacy Policy</a>.
                        </div>
                        <button type="submit" className="btn btn-sm btn-primary text-base-100 w-full">
                            SIGN UP
                        </button>
                        <div className="divider font-medium text-sm">OR</div>
                        <button type="button" className="btn btn-sm btn-outline btn-primary font-medium w-full">
                            <Link href="/sign-in">HAVE AN ACCOUNT? SIGN IN HERE!</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;