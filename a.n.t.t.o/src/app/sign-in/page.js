'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch("http://localhost:8080/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = '/';
            } else {
                setError('Invalid credentials or missing token');
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="flex w-full my-32 justify-center">
            <div className="image">
                <figure>
                    <img
                        className="mx-21 my-14 max-w-400 max-h-max"
                        src="/images/sign_in_image.png"
                        alt="sign_in_image"
                    />
                </figure>
            </div>
            <div className="divider divider-horizontal h-[25.5rem] divider-neutral mx-20"></div>
            <div className="form mx-36 -my-20">
                <form onSubmit={handleSignIn} className="text-center mt-16 font-heading text-primary">
                    <div className="text-lg font-semibold my-8">Sign in</div>
                    <div className="inline-block w-80">
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 my-4">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                        <button type="submit" className="btn btn-sm btn-primary text-base-100 w-full mt-4">
                            SIGN IN
                        </button>
                        <div className="divider font-medium text-sm">OR</div>
                        <button type="button" className="btn btn-sm btn-outline btn-primary font-medium w-full">
                            <Link href="/sign-up">NO ACCOUNT? SIGN UP HERE!</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
