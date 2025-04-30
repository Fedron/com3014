'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Frame from '@/components/CommunityFrame';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import Community from '@/components/Community';
import PostCard from '@/components/PostCard';
import PostCreationBox from '@/components/PostCreationBox';

export default function CommunityPage() {
  const params = useParams();
  const communityId = params?.id;

  const [isLoggedIn, setLoggedIn] = useState(null);
  const [posts, setPosts] = useState([]);
  const [communityName, setCommunityName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setLoggedIn(loggedIn);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/proxied/content/v1/posts/list/${communityId}/`);
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();
        setPosts(data);

        if (data.length > 0 && data[0].community_name) {
          setCommunityName(data[0].community_name);
        } else {
          setCommunityName(`Community #${communityId}`);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
        setCommunityName(`Community #${communityId}`);
      }
    };

    if (communityId) {
      fetchPosts();
    }
  }, [communityId]);

  return (
    <main>
      <Frame imageUrl="/mentoring.jpg" pageTitle={communityName}>
        <div className="relative mx-[2%]">
          <div className='my-4 grid grid-cols-5 gap-4 '>
            <div className='container'>
              <Filter filterName="Post Type">
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
              {isLoggedIn && <PostCreationBox communityId={communityId} />}
              {error && <p className="text-red-600">{error}</p>}
              <div className='font-heading text-sm mb-4'>
                Showing {posts.length} result{posts.length !== 1 ? 's' : ''}
              </div>

              {posts.map((post, index) => (
                <Link key={post.id || index} href={`/post/${post.id}`}>
                <PostCard
                  imageUrl="/default_profile.png"
                  name={post.title}
                  shortdesc={post.description}
                  comments={"0"}
                  likedislike={(post.likes || 0).toString()}
                />
                </Link>
            ))}
            </div>

            <div className='container'>
                <Link href="/live-chat">
                    <button type="submit" className="btn btn-primary w-full mt-4 mb-4 text-lg">Live Chat</button>
                </Link>
              <h1>Related Communities</h1>
              <Community imageUrl="default_profile.png" name="Physics" membercount="2035" />
              <Community imageUrl="default_profile.png" name="Pottery" membercount="463" />
              <Community imageUrl="default_profile.png" name="Rugby" membercount="1335" />
            </div>
          </div>
        </div>
      </Frame>
    </main>
  );
}
