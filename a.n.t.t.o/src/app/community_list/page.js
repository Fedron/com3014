'use client'
import Link from 'next/link';
import Frame2 from '@/components/Frame2';
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
            <Frame2 imageUrl="/community_default.png" pageTitle="Communities">
                <div className="relative">
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
            </Frame2>
        </main>
    );
}

