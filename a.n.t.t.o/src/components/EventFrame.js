const EventFrame = ({ isLoggedIn, children, imageUrl, pageTitle }) => {

    return (
        <div className="box-content h-fit w-full border-2 border-primary my-12 ">
        <div className="w-full h-12 bg-secondary relative ">
            <h1 className="absolute text-lg font-bold font-heading top-2 left-4 text-base-100">{pageTitle}</h1>
            <form action="/event_creation" method="post">  
                <div className="w-full mx-96 p-1">
                    <div className="max-w-md mx-auto w-full">   
                        <div className="relative">
                            <button type="submit" className="inline-flex items-center  text-base-100 absolute end-2.5 -bottom-10 bg-primary hover:bg-secondary  hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                            Create Event</button>
                        </div>
                 </div>
             </div>
             </form>
           
        </div>
        {imageUrl ? (
            <div style={{backgroundImage: `url(/images/banners/${imageUrl})`}} className="relative w-full h-32 justify-center bg-no-repeat bg-cover bg-center"></div>
        ) : (
            <>
            </>
        )}
        {children}
    </div>
    );
}
export default EventFrame;