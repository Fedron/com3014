import CompanyCard from '@/components/CompanyCard';
import Frame from '@/components/Frame';
import CommentBox from '@/components/CommentBox';
import Comment from '@/components/Comment';
import Tag from '@/components/Tag';
import PostContent from '@/components/PostContent';

export default function Page({ params }) {
    return (
        <main className="flex-grow">
            <Frame pageTitle="Nintendo Communications Internship May/June 2024 - July 2025 (1 Year)">

                <div className="mx-[2%]">
                    <div className='my-[2%] grid grid-cols-4 gap-4'>

                        <div className="col-span-2">
                            <div className="w-full">
                                <PostContent userName="A normal person" content="A random post" likes="100" postTitle="A post"></PostContent>
                            </div>
                        </div>

                        <div className="col-span-2 px-2 relative text-sm font-semibold">
                            <Comment userName = "?" content = "A comment" likes = "10"></Comment>
                            <Comment userName = "?" content = "A comment" likes = "10"></Comment>
                            <Comment userName = "?" content = "A comment" likes = "10"></Comment>
                            <Comment userName = "?" content = "A comment" likes = "10"></Comment>
                            <Comment userName = "?" content = "A comment" likes = "10"></Comment>
                            <CommentBox></CommentBox>

                        </div>
                    </div>

                </div>

            </Frame>
        </main>
    )
}