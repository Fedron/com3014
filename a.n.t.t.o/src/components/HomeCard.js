function HomeCard({ bgColor, headingColor, btnColor, opportunityTitle, jobTitle, companyName, location, occupationalArea, closingDate }) {

    const colorVariants = {
        secondaryBg: 'bg-secondary-focus',
        secondaryText: 'text-secondary',
        secondaryBtn: 'btn-secondary',
        accentBg: 'bg-accent-focus',
        accentText: 'text-accent',
        accentBtn: 'btn-accent',
    }

    return (
            <div className={`card h-full rounded-none ${colorVariants[bgColor]} font-heading text-primary text-sm font-medium w-full drop-shadow-md`}>
                <div className="card-body">
                    <h3 className={`${colorVariants[headingColor]} text-base font-bold`}>{opportunityTitle}</h3>
                    <h2 className="text-base font-bold card-title">{jobTitle}</h2>
                    <h4 className="text-sm font-semibold">{companyName}</h4>
                    <h4>{location}</h4>
                    <h4>{occupationalArea}</h4>
                    <h4 className="text-xs">Closes on {closingDate}</h4>
                    <div className="justify-end card-actions">
                        <summary className={`btn ${colorVariants[btnColor]} btn-circle btn-sm`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </summary>
                    </div>
                </div>
            </div>
    );
}

export default HomeCard;
