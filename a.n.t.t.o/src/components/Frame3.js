// Frame for Profile
export default function Frame3({ children, imageUrl, pageTitle }) {
    return (
        <div className="box-content h-fit w-full border-2 border-primary my-12 ">
            <div className="w-full h-12 bg-secondary relative ">
                <h1 className="absolute text-lg font-bold font-heading top-2 left-4 text-base-100">{pageTitle}</h1>
                <div className="w-full mx-96 p-1">
                    <div className="max-w-md mx-auto w-full">   
                        <div className="relative">
                            <button type="submit" className="inline-flex items-center  text-base-100 absolute end-2.5 -bottom-10 bg-primary hover:bg-secondary  hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F1B53D" className="w-5 h-5  me-2">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                            Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            {imageUrl ? (
                <div style={{backgroundImage: `url(/images/banners/${imageUrl})`}} className="relative w-full h-56 justify-center bg-no-repeat bg-cover bg-center"></div>
            ) : (
                <>
                </>
            )}
            {children}
        </div>
    );
}