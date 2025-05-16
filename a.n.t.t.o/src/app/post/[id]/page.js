// import CompanyCard from '@/components/CompanyCard';
'use client';
import Frame from '@/components/Frame';
import CommentBox from '@/components/CommentBox';
import Comment from '@/components/Comment';
// import Tag from '@/components/Tag';
import PostContent from '@/components/PostContent';
import { useEffect, useState } from 'react';

export default function Page({ params }) {
    const [postData, setPostData] = useState(null);
    const [error, setError] = useState('');
    const [comments, setComments] = useState([]);

  
    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proxied/content/v1/posts/${params.id}/`);
          if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
          const data = await res.json();
          setPostData(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchEvent();
    }, [params.id]);

    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proxied/content/v1/comments/list/${params.id}/`);
        if (!res.ok) throw new Error(`Failed to fetch comments: ${res.status}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      }
    };
    
    useEffect(() => {
      fetchComments();
    }, [params.id]);
    
    
  
    if (error) {
      return <main className="p-6 text-red-600">Error: {error}</main>;
    }
  
    if (!postData) {
      return <main className="p-6">Loading event details...</main>;
    }
  
    // const eventDate = new Date(eventData.event_datetime);
    // const deadlineDate = new Date(eventData.deadline);
  
    // const formattedDate = eventDate.toLocaleDateString();
    // const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // const formattedDeadline = deadlineDate.toLocaleDateString();
  
    return (
        <main className="flex-grow">
            <Frame pageTitle={postData.title}>
                <div className="mx-[2%]">
                    <div className='my-[2%] grid grid-cols-4 gap-4'>

                        <div className="col-span-2">
                            <div className="w-full">
                                <PostContent userName={postData.created_by} content={postData.description} likes={postData.likes} postTitle={postData.title}></PostContent>
                            </div>
                        </div>

                        <div className="col-span-2 px-2 relative text-sm font-semibold">
                          {comments.length === 0 ? (
                            <p>No comments yet.</p>
                          ) : (
                            comments.map((comment, index) => (
                              <Comment
                                key={comment.id || index}
                                userName={comment.created_by}
                                content={comment.description}
                                likes={comment.likes}
                              />
                            ))
                          )}
                          <CommentBox postId={params.id} onCommentSubmit={fetchComments} />
                      </div>
                    </div>
                </div>

            </Frame>
        </main>
    )
}