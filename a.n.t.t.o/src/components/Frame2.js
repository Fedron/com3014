//Frame for community 
export default function Frame2({ children, imageUrl, pageTitle }) {

    return (
        <div className="box-content h-fit w-full border-2 border-primary my-12 ">
            <div className="w-full h-12 bg-secondary relative ">
                <h1 className="absolute text-lg font-bold font-heading top-2 left-4 text-base-100">{pageTitle}</h1>
                <div className="w-full mx-96 p-1">
                    <form className="max-w-md mx-auto w-full">   
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>   
                            </div>
                            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary  dark:border-primary dark:placeholder-primary  dark:text-white dark:focus:ring-primary dark:focus:border-primary" placeholder="Search ..." required />
                            <button type="submit" className="text-base-100 absolute end-2.5 bottom-1  bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-6 py-1">Search</button>
                        </div>
                    </form>

                </div>
            </div>
            {imageUrl ? (
                <div style={{backgroundImage: `url(/images/banners/${imageUrl}`} }  className="relative w-full h-56 justify-center bg-no-repeat bg-cover [background-position:center_top_40%]  "></div>

            ) : (
                <>
                </>
            )}
            {children}
        </div>
    );
}