'use client';
import EventDescFrame from '@/components/EventDescFrame';
import ProfileInfoCard from '@/components/ProfileInfoCard';
import EventDescCard from '@/components/EventDescCard';

export default function Page({ params }) {
    return (
        <main className="flex-grow">
            <EventDescFrame  pageTitle="Level Up Your Learning – Interactive Study Strategies Workshop!" imageUrl="workshop.jpg" >

            <div className="w-3/5 p-5 col-span-3 relative">
               <EventDescCard title ="Level Up Your Learning – Interactive Study Strategies Workshop!"  
                    date="29 Mar 2025" 
                    time="14:00 - 15:00"
                    price="5.00"
                    location="Harrington Gardens - London"
                    closingdate="25 Mar 2025"
                    desc={
                        <>🚀 Join us for an exciting live session where we explore proven study techniques, 
                        productivity hacks, and digital tools that can supercharge your learning journey! 
                        Whether you're a student, educator, or lifelong learner, this event will provide practical
                        tips to help you stay focused, retain information better, and make studying more fun. 
                        <br></br>
                        🔹 What to Expect:
                        <br></br>
                        ✅ Expert insights on effective learning techniques  <br></br>
                        ✅ Interactive Q&A and live demos  <br></br>
                        ✅ Networking with fellow learners & educators  <br></br>
                        ✅ Free resources to enhance your study routine  <br></br>
                        <br></br>
                         #LearnBetter #StudySmart #EducationForAll</> }
                 />
                <div className="button absolute top-0 right-20 my-24"> 
                        <button className="inline-flex items-center text-base-100 bg-primary hover:bg-secondary  hover:border  focus:outline-none  rounded-lg font-semibold btn ">Join Now</button>
                </div>

                <div className=" absolute top-0 -right-[58%] my-10">
                    <h3 className="font-semibold">Location :</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F1B53D" className="size-5">
                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg> 
                        <h4 className="text-base font-normal">
                            Harrington Gardens - London
                        </h4>
                    </div>
                    <div className="map w-96 h-64 bg-secondary-focus mt-4 rounded-md shadow-inner flex items-center justify-center text-sm text-gray-500">
                        [Map]
                    </div>
                                        
                </div>
            </div> 
            </EventDescFrame>
        </main>
    )
}