function CompanyCard({ imageUrl, name, desc, sdgs, email }) {
    return (
        <div className="bg-base-100 rounded-lg p-4">
            <div className="flex">
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="flex-none h-10 w-10 justify-center bg-no-repeat bg-contain bg-center"></div>
                <div className="flex-none font-semibold m-2">{name}</div>
            </div>
            <div className="text-xs my-4">{desc}</div>
            <div className="mt-6 mb-2 font-semibold text-sm">Sustainable Development Goals</div>
            <div className="flex flex-wrap">
                {sdgs.map(id => (
                    <div style={{backgroundImage: `url(/images/sdgs/${id}.png)`}} className="flex-none mr-2 mb-2 h-16 w-16 justify-center bg-no-repeat bg-contain bg-center"></div>
                ))}
            </div>
            <div className="mt-6 font-semibold text-sm">Contact Details</div>
            <div className="text-xs">Email: {email}</div>
        </div>
    )
}

export default CompanyCard;