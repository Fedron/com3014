import EventFrame from '@/components/EventFrame';
import EventCard from '@/components/EventCard';
import Filter from '@/components/Filter';
import FilterOption from '@/components/FilterOption';
export default function Events() {
    return (
        <main>
            <EventFrame imageUrl="/events_banner.png" pageTitle="Events">
            <div className="relative">
                <div className='mx-4 my-6 grid grid-cols-5 gap-4 '>
                    <div className='container'>
                        <div className="font-heading text-m font-bold mb-2">
                          Filter Section
                        </div>
                        <Filter filterName="Category">
                            <FilterOption option="Engineering" />
                            <FilterOption option="HR and recruitment" />
                        </Filter>     
                        <Filter filterName="Date">
                            <label htmlFor="from">From: </label><input type="date" id="from" />
                            <label htmlFor="to">To: </label><input type="date" id="to" />
                        </Filter>   
                        <Filter filterName="Location">
                            <FilterOption option="Bath" />
                            <FilterOption option="Cardiff" />
                            <FilterOption option="Edinburgh" />
                            <FilterOption option="Glasgow" />
                            <FilterOption option="London" />
                            <FilterOption option="Oxford" />
                            <FilterOption option="York" />
                        </Filter>    
                        <Filter filterName="Event Type">
                            <FilterOption option="Conference" />
                            <FilterOption option="Festival" />
                            <FilterOption option="Networking" />
                            <FilterOption option="Seminar" />
                        </Filter>     
                    </div>
                
                    <div className='col-span-4'>
                        <div className='my-2 grid grid-cols-3 gap-3 gap-y-4'>
                            <EventCard imageUrl="/workshop.jpg"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />       
                            <EventCard imageUrl="/default_event_img.png"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />         
                            <EventCard imageUrl="/default_event_img.png"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />   
                            <EventCard imageUrl="/workshop.jpg"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />   
                            <EventCard imageUrl="/workshop.jpg"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />   
                            <EventCard imageUrl="/workshop.jpg"
                                       cardTitle="Level Up Your Learning Interactive Study Strategies Workshop" 
                                       date="29 Mar 2025" 
                                       price="5.00"
                                       location="Harrington Gardens - London"
                                       closingdate="25 Mar 2025"
                            />   
                        </div> 
                    </div>  
                    
                </div>
            </div>
            </EventFrame>
        </main>
    );
}