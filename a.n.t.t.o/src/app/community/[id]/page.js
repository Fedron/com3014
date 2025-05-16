'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Frame from '@/components/Frame';
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
  const [communityDesc, setCommunityDesc] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [commentCounts, setCommentCounts] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setLoggedIn(loggedIn);
    }
  }, []);

  useEffect(() => {
    const fetchPostsAndCommentCounts = async () => {
      try {
        const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proxied/content/v1/posts/list/${communityId}/`);
        if (!postRes.ok) throw new Error(`Failed to fetch posts: ${postRes.status}`);
        const postData = await postRes.json();
        setPosts(postData);
  
        // Fetch comment counts for each post
        const commentCounts = {};
        await Promise.all(
          postData.map(async (post) => {
            try {
              const commentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proxied/content/v1/comments/list/${post.id}/`);
              if (!commentRes.ok) throw new Error();
              const comments = await commentRes.json();
              commentCounts[post.id] = comments.length;
            } catch {
              commentCounts[post.id] = 0;
            }
          })
        );
  
        setCommentCounts(commentCounts);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setCommunityName(`Community #${communityId}`);
      }
    };
  
    if (communityId) {
      fetchPostsAndCommentCounts();
    }
  }, [communityId]);
  

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8080/proxied/community/v1/communities/${communityId}/`);
        if (!res.ok) throw new Error(`Failed to fetch community details: ${res.status}`);
        const data = await res.json();
  
        setCommunityName(data.name || `Community #${communityId}`);
        setCommunityDesc(data.desc || '');
        setMemberCount(data.members || 0);
      } catch (err) {
        console.error('Community metadata error:', err);
        setCommunityName(`Community #${communityId}`);
      }
    };
  
    if (communityId) {
      fetchCommunityDetails();
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
                <div className="mb-4">
                    <p className="font-semibold">Community Description:</p>
                    <p>{communityDesc}</p>
                    <p className="text-sm text-gray-600 mt-2">👥 {memberCount} Member{memberCount !== 1 ? 's' : ''}</p>
                </div>
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
                  comments={(commentCounts[post.id] ?? 0).toString()}
                  likedislike={(post.likes || 0).toString()}
                />
                </Link>
            ))}
            </div>

            <div className='container'>
              {isLoggedIn && (
                <Link href="/live-chat">
                  <button type="submit" className="btn btn-primary w-full mt-4 mb-4 text-lg">Live Chat</button>
                </Link>
              )}
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
