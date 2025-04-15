'use client';
import Frame3 from '@/components/Frame3';
import ProfileInfoCard from '@/components/ProfileInfoCard';
import PostCard from '@/components/PostCard';
export default function Profile() {
    return (
        <main>
            <Frame3 pageTitle="Profile" imageUrl="default_profile_banner.jpg">
                <div className="mx-[2%]"></div>
                    <ProfileInfoCard imageUrl="default_profile.png" name="Name" emailAddress="email@surrey.ac.uk"/>
                <div className="tabs tabs-bordered px-12 py-5 bg-base-100">
                    <input type="radio" name="my_tabs_2" className="tab text-base bg-base-100" aria-label="Posts" defaultChecked/>
                    <div className="tab-content border-base-300 bg-neutral-content p-5">
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}></PostCard>
                        <PostCard imageUrl="default_profile.png" name="Science of Sleep" shortdesc={"F"} comments={"100"} likedislike={"-100"}></PostCard>
                    </div>
                    <input type="radio" name="my_tabs_2" className="tab text-base bg-base-100" aria-label="Communities"  />
                    <div className="tab-content border-base-300 bg-neutral-content p-5">Tab content 2</div>

                    <input type="radio" name="my_tabs_2" className="tab text-base bg-base-100 " aria-label="Friends" />
                    <div className="tab-content border-base-300 bg-neutral-content p-5">Tab content 3</div>
                </div>
  
            </Frame3>
        </main>
    );
}