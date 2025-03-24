function OpportunitiesCard({imageUrl, jobTitle, companyName, opportunityType, occupationalArea, location, closingDate, children}) {
  return (
      <div className="group my-2 card rounded-none flex flex-wrap lg:card-side bg-base-100 shadow hover:shadow-md hover:cursor-pointer">
        <div className="image">
          <div className="relative inline-block">
            <div className="absolute 
                    border-t-[0px] border-t-transparent
                    border-l-[60px] border-l-success 
                    border-b-[55px] border-b-transparent"
            ></div>
            <div className="relative z-10 -top-2 -mx-3 -rotate-45 p-4">
              <h1 className="font-bold text-base-100">New</h1>
            </div>
          </div>

          <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="mx-8 -mt-2 h-24 w-24 justify-center bg-no-repeat bg-cover bg-center"></div>
        </div>
        <div className="card-body mt-1 mb-2 p-0 text-xs font-semibold">
          <div className="text-lg font-bold group-hover:text-accent">{jobTitle}</div>
          <div className="text-sm">{companyName}</div>
          <div>
            {children}
          </div>
          <h4>
            Opportunity type:&ensp;
            <span className="font-normal">{opportunityType}</span>
          </h4>
          <h4>
            Occupational areas:&ensp;
            <span className="font-normal">{occupationalArea}</span>
          </h4>
          <h4>
            Locations:&ensp;
            <span className="font-normal">{location}</span>
          </h4>
          <div className="justify-end flex absolute bottom-2 right-3">
            <div className="inline-flex mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#CB3340" className="w-4 h-4">
                <path  strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </div>
            <h4 className="inline-flex font-semibold text-error">
              Closes on {closingDate}
            </h4>
          </div>
        </div>
      </div>
  );
}
export default OpportunitiesCard;
