'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Frame2 from '@/components/Frame2';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import Community from '@/components/Community';
import PostCard from '@/components/PostCard';
import CheckboxOption from '@/components/CheckboxOption';

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState('');


  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch('http://localhost:8080/proxied/community/v1/communities/');
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        const sorted = [...data].sort((a, b) => (b.members || 0) - (a.members || 0));
        setCommunities(sorted);
      } catch (err) {
        console.error('Failed to fetch communities:', err);
        setError('Could not load popular communities.');
      }
    };
  
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8080/proxied/content/v1/posts/list/');
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPosts(data.slice(0, 20)); // limit to 20 posts
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setPostError('Could not load posts.');
      }
    };
  
    fetchCommunities();
    fetchPosts();
  }, []);
  

  return (
    <main>
      <Frame2 imageUrl="/HOME_BANNER.png" pageTitle="Home">
        <div className="relative mx-[2%]">
          <div className='my-4 grid grid-cols-5 gap-4'>
            <div className='container'>
              <CheckboxOption option="Subscribed Only" />
              <Filter filterName="Community Type">
                <FilterOption option="Engineering" />
                <FilterOption option="HR and recruitment" />
              </Filter>
              <Filter filterName="Subject Area">
                <FilterOption option="Accounting and Finance" />
                <FilterOption option="Biosciences" />
              </Filter>
              <Filter filterName="Activity Level">
                <FilterOption option="Ac" />
              </Filter>
            </div>

            <div className='col-span-3'>
              <div className='grid grid-cols-5'>
                <div className='font-heading text-sm'>1 to 50 of 1307 results</div>
              </div>
                {postError && <p className="text-red-500">{postError}</p>}
                {posts.map((post, index) => (
                <Link key={post.id || index} href={`/post/${post.id}`}>
                    <PostCard
                    imageUrl="default_profile.png"
                    name={post.title}
                    shortdesc={post.description}
                    comments={"0"} // replace with real count later
                    likedislike={(post.likes || 0).toString()}
                    />
                </Link>
                ))}
            </div>

            <div className='container'>
            <h1 className="font-bold text-lg mb-2">Popular Communities</h1>
            {error && <p className="text-red-500">{error}</p>}
            {communities.slice(0, 5).map((community, index) => (
            <Link key={community.id || index} href={`/community/${community.id}`}>
                <Community
                imageUrl="default_profile.png"
                name={community.name}
                membercount={community.membercount}
                />
            </Link>
            ))}
            </div>
          </div>
        </div>
      </Frame2>
    </main>
  );
}
