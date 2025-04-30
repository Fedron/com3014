'use client';
import { useState } from 'react';

export default function PostCreationBox({ communityId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (typeof window === 'undefined') return;

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('token');

    if (isLoggedIn !== 'true' || !token) {
      setError('You must be logged in to post.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/proxied/content/v1/posts/list/${communityId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            title,
            description,
            community: communityId,
            created_by: "00000000-0000-0000-0000-000000000000",
            likes: 0,
            date_created: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to create post: ${errText}`);
      }

      setSuccess('Post created successfully!');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="my-4 card rounded-none lg:card-side bg-base-100 shadow">
      <form onSubmit={handleSubmit}>
        <div className="my-4 ml-5 card rounded-none lg:card-side bg-base-100 shadow">
          <input
            type="text"
            id="ptitle"
            name="ptitle"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          /><br />
        </div>
        <div className="my-4 ml-5 card rounded-none lg:card-side bg-base-100 shadow">
          <textarea
            rows="4"
            cols="73"
            placeholder="What are your thoughts on this?"
            id="pcontent"
            name="pcontent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea><br />
        </div>
        {error && <p className="text-red-600 ml-6">{error}</p>}
        {success && <p className="text-green-600 ml-6">{success}</p>}
        <div className="my-8 ml-6 card rounded-none lg:card-side bg-base-100">
          {/* Attach Button */}
          <button type="submit" className="inline-flex items-center  text-base-100 absolute -bottom-4 -left-2 hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-2 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F1B53D" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
            </button>
            {/* Emoji Button */}
            <button type="submit" className="inline-flex items-center  text-base-100 absolute -bottom-4 left-6 hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-2 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F1B53D" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
            </button>
            {/* Post Button */}
            <button type="submit" className="inline-flex items-center text-base-100 absolute end-2.5 -bottom-4 -right-0.5 bg-primary hover:bg-secondary hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#F1B53D" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
