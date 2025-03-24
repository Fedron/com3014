function MentoringCard({imageUrl,name,jobPosition,graduationYear,children}) {
    return (
        <div className="my-4 card rounded-none lg:card-side bg-base-100 shadow">
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="mx-8 my-4 h-24 w-24 justify-center bg-no-repeat bg-cover bg-center"></div>
            
            <div className="card-body relative text-xs font-semibold p-0 mb-4">
                <span className="text-lg font-bold card-title mt-2">{name}</span>
                {children}
                <h4>
                    Job Position:&ensp;
                    <span className="font-normal">{jobPosition}</span>
                </h4>
                <h4>
                    Graduation Year:&ensp;
                    <span className="font-normal">{graduationYear}</span>
                </h4>
                <div className="absolute bottom-0 right-4 font-heading">
                        <button className="btn btn-primary btn-sm no-animation w-fit font-medium">
                            Request mentoring
                        </button>
                    </div>
                </div>
        </div>
    
    )
  }
  export default MentoringCard;