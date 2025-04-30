'use client';
import { useEffect, useState } from 'react';
import EventDescFrame from '@/components/EventDescFrame';
import EventDescCard from '@/components/EventDescCard';

export default function Page({ params }) {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/v1/events/${params.id}`);
        if (!res.ok) throw new Error(`Failed to fetch event: ${res.status}`);
        const data = await res.json();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEvent();
  }, [params.id]);

  if (error) {
    return <main className="p-6 text-red-600">Error: {error}</main>;
  }

  if (!eventData) {
    return <main className="p-6">Loading event details...</main>;
  }

  const eventDate = new Date(eventData.event_datetime);
  const deadlineDate = new Date(eventData.deadline);

  const formattedDate = eventDate.toLocaleDateString();
  const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDeadline = deadlineDate.toLocaleDateString();

  return (
    <main className="flex-grow">
      <EventDescFrame pageTitle={eventData.name} imageUrl="/workshop.jpg">
        <div className="w-3/5 p-5 col-span-3 relative">
          <EventDescCard
            title={eventData.name}
            date={formattedDate}
            time={formattedTime}
            price="Free"
            location={eventData.location}
            closingdate={formattedDeadline}
            desc={
              <>
                {eventData.description}
                <br /><br />
                <strong>Spots filled:</strong> {eventData.joined_count} / {eventData.max_capacity}
              </>
            }
          />
          <div className="button absolute top-0 right-20 my-24">
            <button className="inline-flex items-center text-base-100 bg-primary hover:bg-secondary hover:border focus:outline-none rounded-lg font-semibold btn">
              Join Now
            </button>
          </div>

          <div className="absolute top-0 -right-[58%] my-10">
            <h3 className="font-semibold">Location :</h3>
            <div className="flex items-center space-x-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F1B53D" className="size-5">
                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
              <h4 className="text-base font-normal">{eventData.location}</h4>
            </div>
            <div className="map w-96 h-64  mt-4 rounded-md  flex items-center justify-center text-sm text-gray-500">
              
            </div>
          </div>
        </div>
      </EventDescFrame>
    </main>
  );
}
