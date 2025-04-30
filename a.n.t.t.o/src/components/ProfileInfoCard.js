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
                {/* <button type="submit" className="inline-flex items-center  text-base-100 absolute end-2.5 -bottom-10 bg-primary hover:bg-secondary  hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F1B53D" className="w-5 h-5  me-2">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                Edit</button>  */}
                <button type="submit" className="inline-flex items-center  text-base-100 absolute end-2.5 bottom-8 bg-primary hover:bg-secondary  hover:border focus:ring-1 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F1B53D" className="w-5 h-5  me-2">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                Edit</button> 
               </div>
             
          </div>
      </div>
    );
  }
  export default ProfileInfoCard;
  