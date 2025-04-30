'use client';
import { useState } from 'react';

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to create an event.');
        return;
      }

      const eventDateTime = new Date(`${date}T${time}:00Z`).toISOString();
      const deadlineDateTime = new Date(`${closingDate}T00:00:00Z`).toISOString();
  
      const payload = {
        name: title,
        location,
        event_datetime: eventDateTime,
        deadline: deadlineDateTime,
        description,
        max_capacity: 100
      };
  
      console.log('Sending payload:', payload);
  
      const response = await fetch('http://localhost:8080/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      setMessage('Event created successfully!');
      setTitle('');
      setLocation('');
      setDate('');
      setTime('');
      setClosingDate('');
      setDescription('');
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    }
  };
  

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-base-100 shadow-md rounded-xl p-6">
        <div>
          <label className="block font-medium">Event Title</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              className="input input-bordered w-full mt-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Time</label>
            <input
              type="time"
              className="input input-bordered w-full mt-1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Price (£)</label>
            <input
              type="number"
              className="input input-bordered w-full mt-1"
              disabled
              placeholder="Ignored"
            />
          </div>
          <div>
            <label className="block font-medium">Closing date</label>
            <input
              type="date"
              className="input input-bordered w-full mt-1"
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Event Description</label>
          <textarea
            rows="5"
            className="textarea textarea-bordered w-full mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="col-span-full">
          <label className="block font-medium">Cover Photo</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="#F1B53D" aria-hidden="true">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
              </svg>
              <p className="mt-4 text-sm text-gray-600">Upload disabled</p>
              <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {message && <div className="text-center text-red-500 mt-2">{message}</div>}
        <button type="submit" className="btn btn-primary w-full mt-4">Create Event</button>
      </form>
    </main>
  );
}
