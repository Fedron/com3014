'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCommunity() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn !== 'true') {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
      setSuccess('');
    
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authorized. Please sign in again.');
        return;
      }
    
      try {
        const payload = {
          name,
          desc: description
        };
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proxied/community/v1/communities/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Failed to create community: ${errText}`);
        }
    
        setSuccess('Community created successfully!');
        setName('');
        setDescription('');
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };
    
  

    if (isLoggedIn === false) {
        return (
            <main className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p>You must be signed in to create a community.</p>
                <button className="btn btn-primary mt-4" onClick={() => router.push('/sign-in')}>
                    Go to Sign In
                </button>
            </main>
        );
    }

    if (isLoggedIn === null) return null; // optional: loading state

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Create New Community</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 shadow-md rounded-xl p-6">
                <div>
                    <label className="block font-medium">Community Name</label>
                    <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full mt-1"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium">Community Description</label>
                    <textarea
                        name="description"
                        rows="5"
                        className="textarea textarea-bordered w-full mt-1"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block font-medium">Cover Photo</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="#F1B53D" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                            </svg>
                            <div className="mt-4 flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}

                <button type="submit" className="btn btn-primary w-full mt-4">Create Community</button>
            </form>
        </main>
    );
}
