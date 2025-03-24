export default function AppointmentCard({ children, imageUrl, cardTitle, cardDesc }) {

    return (
        <div tabIndex={0} className="my-6 collapse rounded-none border border-base-200 bg-base-100 font-heading shadow">
            <input type="checkbox" />
                <div className="collapse-title p-0">
                    <div className="relative flex">
                        <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="h-24 w-24 justify-center bg-no-repeat bg-cover bg-center"></div>
                        <div className="mx-4 mt-6">
                            <p className="text-lg font-semibold">{cardTitle}</p>
                            <p className="text-xs font-medium">{cardDesc}</p>
                    </div>
                    <div className="absolute bottom-8 right-5 z-0">
                        <button className="btn btn-primary btn-sm no-animation w-fit font-medium">
                            View appointments
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="collapse-content p-0">
                <div className="m-4 overflow-x-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
