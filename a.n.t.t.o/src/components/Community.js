function Community({imageUrl,name,membercount,children}) {
    return (
        <div className="my-3 card rounded-none lg:card-side bg-base-100 shadow">
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="mx-5 my-4 h-10 w-10 justify-center bg-no-repeat bg-cover bg-center"></div>
            
            <div className="card-body relative text-xs font-semibold p-0 mb-4">
                <span className="text-lg font-bold card-title mt-2">{name}</span>
                {children}
                <h4>
                    Member Count:&ensp;
                    <span className="font-normal">{membercount}</span>
                </h4>
                </div>
        </div>
    
    )
  }
  export default Community;