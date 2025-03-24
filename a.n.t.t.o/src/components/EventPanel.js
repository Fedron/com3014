export default function EventCard({ date, eventTitle, time, location}) {
    return (
            <div className="w-full text-xs font-medium rounded-none h-fit card drop-shadow-md font-heading text-base-100 bg-primary-focus">
                <div className="card-body">
                    <h4 className="font-bold text-primary">{date}</h4>
                    <h2 className="text-sm font-semibold card-title">{eventTitle}</h2>
                    <div className="flex space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h4>{time}</h4>
                    </div>
                    <div className="flex space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h4>{location}</h4>
                    </div>
                </div>
            </div>
    );
}