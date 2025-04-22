function UserCard({imageUrl,name}) {
    return (
        <div className="my-4 card rounded-none lg:card-side bg-base-100 shadow">
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="mx-8 my-4 h-24 w-24 justify-center bg-no-repeat bg-cover bg-center"></div>
            
            <div className="card-body relative text-xs font-semibold p-0 mb-4">
                <span className="text-lg font-bold card-title mt-2">{name}</span>
                </div>
        </div>   
    )
  }
  export default UserCard;