import HomeImage from '@/components/HomeImage';
import HomeCard from '@/components/HomeCard';
import EventCard from '@/components/EventPanel';

async function getLatestJobs() {
  const response = await fetch('http://localhost:8000/getLatestJobs-Json');
  return response.json();
}

export default async function Home() {

  const latestJobs = await getLatestJobs();

  return (
    <main>
      <HomeImage />

      <div className='my-5 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-11'>
        <div className='col-span-8 h-fit lg:pe-7'>
          <h2 className='my-2 font-medium font-heading text-primary'>Latest Opportunities</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <HomeCard bgColor="accentBg" headingColor="accentText" btnColor="accentBtn" opportunityTitle={latestJobs.jobLists[0].type} jobTitle={latestJobs.jobLists[0].title} companyName={latestJobs.jobLists[0].company} location={latestJobs.jobLists[0].location}
                      occupationalArea={latestJobs.jobLists[0].groups.map(element => element.groupName).join("; ")} closingDate={latestJobs.jobLists[0].closingdate} />
            <HomeCard bgColor="secondaryBg" headingColor="secondaryText" btnColor="secondaryBtn" opportunityTitle={latestJobs.jobLists[1].type} jobTitle={latestJobs.jobLists[1].title} companyName={latestJobs.jobLists[1].company} location={latestJobs.jobLists[1].location}
                      occupationalArea={latestJobs.jobLists[1].groups.map(element => element.groupName).join("; ")} closingDate={latestJobs.jobLists[1].closingdate} /> 
          </div>
        </div>
        <div className='col-span-4 sm:col-span-3 h-fit mt-4 lg:m-0'>
          <h2 className='my-2 font-medium font-heading text-primary'>Upcoming Events</h2>
          <EventCard date="Mon, 4 Mar 2024" eventTitle="Empower HER: Building Confidence For Women in the Workplace" time="6:00 PM - 7:30 PM" location="Virtual event / Webinar"/>
          <EventCard date="Tue, 5 Mar 2024" eventTitle="Mastering Online Interviews with Unilever" time="6:00 PM - 7:00 PM" location="LTB"/>
        </div>
      </div>
    </main>
  );
}
