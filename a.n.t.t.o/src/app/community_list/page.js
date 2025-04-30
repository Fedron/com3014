'use client'
import Link from 'next/link';
import CommunityFrame from '@/components/CommunityFrame';
import CommunityCard from '@/components/CommunityCard';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import { useEffect, useState } from "react";

export default function CommunityList() {
    const [communityList, setCommunityList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:8080/proxied/community/v1/communities/");
                if (!result.ok) throw new Error('Failed to fetch events');
                const res1data = await result.json();
                setCommunityList(res1data);
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
            <CommunityFrame imageUrl="/community_default.png" pageTitle="Communities">
                <div className="relative">
                    <div className="absolute -top-7 left-1/2  -translate-x-1/2 -translate-y-1/2  w-[500px]">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>   
                            </div>
                            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:border-primary dark:placeholder-primary  dark:text-white dark:focus:ring-primary dark:focus:border-primary" placeholder="Search ..." required />
                            <button type="submit" className="text-base-100 absolute end-2.5 bottom-1  bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-6 py-1">Search</button>
                    </div>  
                    <div className='mx-4 my-6 grid grid-cols-5 gap-4'>
                        <div className='container'>
                            <div className="font-heading text-m font-bold mb-2">
                                Filter Section
                            </div>
                           < Filter filterName="Community Type">
                                <FilterOption option="Engineering" />
                                <FilterOption option="HR and recruitment" />
                            </Filter>
                            <Filter filterName="Subject Area">
                                <FilterOption option="Accounting and Finance" />
                                <FilterOption option="Biosciences" />
                            </Filter>
                            <Filter filterName="Member Count">
                                <FilterOption option="Accounting and Finance" />
                                <FilterOption option="Biosciences" />
                            </Filter>
                            <Filter filterName="Activity Level">
                                <FilterOption option="Ac" />
                            </Filter>
                        </div>

                        <div className='col-span-4'>
                            <div className='my-2 grid grid-cols-3 gap-3 gap-y-4'>
                                {loading && <p>Loading events...</p>}
                                {error && <p className="text-red-600">Error: {error}</p>}
                                {!loading && !error && communityList.length > 0 && communityList.map((community, index) => (
                                    <Link key={community.id || index} href={`/community/${community.id}`}>
                                       
                                        <CommunityCard imageUrl ="/workshop.jpg"cardTitle ={community.name} members={community.members} />
                                    </Link>
                                   
                                    
                                ))}
                                {!loading && !error && communityList.length === 0 && (
                                    <p>No events found.</p>
                                )}
                            
                            </div>
                        </div>  
                    </div>
                </div>
            </CommunityFrame>
        </main>
    );
}

