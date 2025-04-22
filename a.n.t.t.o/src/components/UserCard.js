function UserCard({imageurl,name}) {
    return (
        <div className="card card-side h-16 w-64 bg-base-100 shadow-sm">
            <div className ="ml-3 p-1 ">
                <div style={{backgroundImage: `url(/images/${imageurl})`}} className="rounded-full w-14 h-14 bg-no-repeat bg-cover bg-center"></div>
            </div>
            <div className="card-body justify-center left-20">
                <h5 className="card-title font-normal  ">{name}</h5>     
            </div>
        </div>

    // delete homecard 
    )
  }
  export default UserCard;