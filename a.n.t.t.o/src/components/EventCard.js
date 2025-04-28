import Link from 'next/link';
function EventCard({imageUrl,cardTitle,date,price,location,closingdate}) {
    return (
        // <Link href={`/event_description/${Id}`}>
            <div className="card card-compact bg-base-100 w-[98%] shadow-sm">
                
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className=" h-40 w-full rounded-t-lg justify-center bg-no-repeat bg-cover bg-center"></div> 
                <div className="card-body">
                    <h3 className="card-title  font-semibold">{cardTitle}</h3>
    
                   <div className="space-y-0">
                        <h5 className="text-base font-semibold">
                            Date :&ensp;<span className="text-sm font-normal">{ date }</span>
                        </h5>
                        <h5 className="text-base font-semibold">
                            Price :&ensp;<span className="text-sm font-normal">£{price} per ticket</span>
                        </h5>
                        <h5 className="text-base font-semibold">
                            Location :&ensp;<span className="text-sm font-normal">{location}</span>
                        </h5>
                        <h5 className="text-base font-semibold">
                            Closing Date :&ensp;<span className="text-sm font-normal">{closingdate}</span>
                        </h5>
                    </div> 
                    
                </div>
            </div>
        // </Link>
        
      
    )
  }
  export default EventCard;