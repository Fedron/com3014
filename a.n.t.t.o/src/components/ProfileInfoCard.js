function ProfileInfoCard({imageUrl, name, emailAddress}) {
    return (
      <div className="card rounded-none lg:card-side bg-base-100 shadow relative min-h-28">
           <div className="absolute -top-16 left-6 z-30"> 
           {/* <div className="ml-10 mr-4 my-3.5 items-start object-left"> */}
              <div style={{backgroundImage: `url(/images/${imageUrl})`}} className=" h-36 w-36 bg-no-repeat bg-cover bg-center rounded-full shadow-lg "></div>  
          </div>
          <div className={`card h-full rounded-none font-heading text-neutral text-sm font-medium w-full bg-base-100 flex flex-col justify-center `}>
              <div className="card-body ml-40 -my-5  ">
                  <h3 className={`text-xl font-bold card-title`}>{name}</h3>
                  <div className="flex space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                      </svg>
                      <h4 className="text-base font-medium">
                          Email address:&ensp;
                          <span className="text-sm font-normal">{emailAddress}</span>
                      </h4>
                  </div>      
               </div>
          </div>
      </div>
    );
  }
  export default ProfileInfoCard;
  