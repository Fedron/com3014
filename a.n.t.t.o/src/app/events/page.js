'use client'
import Link from 'next/link';
import EventFrame from '@/components/EventFrame';
import EventCard from '@/components/EventCard';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import { useEffect, useState } from "react";

export default function Events() {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/events`);
                if (!result.ok) throw new Error('Failed to fetch events');
                const res1data = await result.json();
                setEventList(res1data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            <EventFrame imageUrl="/events_banner.png" pageTitle="Events">
                <div className="relative">
                    <div className='mx-4 my-6 grid grid-cols-5 gap-4'>
                        <div className='container'>
                            <div className="font-heading text-m font-bold mb-2">
                                Filter Section
                            </div>
                            <Filter filterName="Category">
                                <FilterOption option="Music" />
                                <FilterOption option="Maths" />
                            </Filter>     
                            <Filter filterName="Date">
                                <label htmlFor="from">From: </label><input type="date" id="from" />
                                <label htmlFor="to">To: </label><input type="date" id="to" />
                            </Filter>   
                            <Filter filterName="Location">
                                <FilterOption option="Bath" />
                                <FilterOption option="Cardiff" />
                                <FilterOption option="Edinburgh" />
                                <FilterOption option="Glasgow" />
                                <FilterOption option="London" />
                                <FilterOption option="Oxford" />
                                <FilterOption option="York" />
                            </Filter>    
                            <Filter filterName="Event Type">
                                <FilterOption option="Conference" />
                                <FilterOption option="Festival" />
                                <FilterOption option="Networking" />
                                <FilterOption option="Seminar" />
                            </Filter>     
                        </div>

                        <div className='col-span-4'>
                            <div className='my-2 grid grid-cols-3 gap-3 gap-y-4'>
                                {loading && <p>Loading events...</p>}
                                {error && <p className="text-red-600">Error: {error}</p>}
                                {!loading && !error && eventList.length > 0 && eventList.map((event, index) => (
                                    <Link key={event.id || index} href={`/event_description/${event.id}`}>
                                        <EventCard
                                        imageUrl="/workshop.jpg"
                                        cardTitle={event.name}
                                        date={event.event_datetime}
                                        price={event.price}
                                        location={event.location}
                                        closingdate={event.deadline}
                                        />
                                    </Link>
                                ))}
                                {!loading && !error && eventList.length === 0 && (
                                    <p>No events found.</p>
                                )}
                            </div>
                        </div>  
                    </div>
                </div>
            </EventFrame>
        </main>
    );
}
