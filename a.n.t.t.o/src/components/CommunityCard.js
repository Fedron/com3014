
function CommunityCard({imageUrl,cardTitle,members,}) {
    return (
            <div className="card card-compact bg-base-100 w-[98%] shadow-sm">
                
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className=" h-40 w-full rounded-t-lg justify-center bg-no-repeat bg-cover bg-center"></div> 
                <div className="card-body">
                    <h3 className="card-title  font-semibold">{cardTitle}</h3>
    
                   <div className="space-y-0">
                        <h5 className="text-base font-semibold">
                            Members :&ensp;<span className="text-sm font-normal">{members}</span>
                        </h5>
                    </div> 
                    
                </div>
            </div>
        
      
    )
  }
  export default CommunityCard;