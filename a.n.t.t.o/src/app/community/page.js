import Frame from '@/components/Frame';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
import Community from '@/components/Community';
import PostCard from '@/components/PostCard';
import PostCreationBox from '@/components/PostCreationBox';

export default function Home() {
    return (
        <main>
            <Frame imageUrl="/mentoring.jpg" pageTitle="CommunityName">
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
                        <PostCreationBox></PostCreationBox>
                        <div className='font-heading text-sm'>1 to 50 of 1307 results</div>
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}>
                        </PostCard>
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}>
                        </PostCard>
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}>
                        </PostCard>
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}>
                        </PostCard>
                    </div>
                    <div className='container'>
                        <h1>Related Communities</h1>
                        <Community imageUrl="default_profile.png" name="Physics" membercount="2035">
                        </Community>
                        <Community imageUrl="default_profile.png" name="Pottery" membercount="463">
                        </Community>
                        <Community imageUrl="default_profile.png" name="Rugby" membercount="1335">
                        </Community>
                    </div>  
                </div>
            </div>
            </Frame>
        </main>
    );
}