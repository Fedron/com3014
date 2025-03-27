'use client';
import Frame3 from '@/components/Frame3';
import ProfileCard from '@/components/ProfileCard';
import SkillPopUp from '@/components/SkillPopUp';
import Tag from '@/components/Tag';

export default function Profile() {
    return (
        <main>
            <Frame3 pageTitle="Profile" imageUrl="default_profile_banner.jpg">
                <div className="mx-[2%]"></div>
                    <ProfileCard imageUrl="default_profile.png" name="Punam Gurung" emailAddress="pg061@surrey.ac.uk" course="BSc Computer Science" gradYear="2024" />
                    <div className="mt-6 card rounded-none lg:card-side bg-base-100">
                    <div className={`card h-full rounded-none font-heading text-neutral text-sm font-medium w-full h-70 bg-base-100`}>
                        <div className="card-body"> 
                            <h3 className={`text-xl font-bold card-title`}>Skills&ensp;</h3>
                            <span>
                            <Tag color="primary" tagName="Artificial Intelligence" />
                            <Tag color="primary" tagName="Blockchain Technology"/>
                            <Tag color="primary" tagName="Communications"/>
                            <Tag color="primary" tagName="Creative"/>
                            <Tag color="primary" tagName="Java"/>
                            <Tag color="primary" tagName="Python"/>
                            <Tag color="primary" tagName="Software Engineering"/>
                            <Tag color="primary" tagName="Teamwork"/>
                            </span>
                            <SkillPopUp modal_id="1" action='add' name="Add Skills" description ="Search and click on a skill to add to your profile."></SkillPopUp>
                            <SkillPopUp modal_id="2" action="remove" name="Remove Skills" description ="Click on a skill to remove it from your profile.">                            
                                <Tag color="error" buttonType="delete"  tagName="Artificial Intelligence" />
                                <Tag color="error" buttonType="delete"  tagName="Blockchain Technology" />
                                <Tag color="error" buttonType="delete"  tagName="Communications" />
                                <Tag color="error" buttonType="delete"  tagName="Creative" />
                                <Tag color="error" buttonType="delete"  tagName="Java" />
                                <Tag color="error" buttonType="delete"  tagName="Python" />
                                <Tag color="error" buttonType="delete"  tagName="Software Engineering" />
                                <Tag color="error" buttonType="delete"  tagName="Teamwork" />
                            </SkillPopUp>
                        </div>
                    </div>
                    </div>
            </Frame3>
        </main>
    );
}