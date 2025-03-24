function PostCard({imageUrl,name,shortdesc,likedislike,comments,children}) {
    return (
        <div className="my-4 card rounded-none lg:card-side bg-base-100 shadow">
                <div style={{backgroundImage: `url(/images/${imageUrl})`}} className="mx-8 my-4 h-24 w-24 justify-center bg-no-repeat bg-cover bg-center"></div>
            
            <div className="card-body relative text-xs font-semibold p-0 mb-4">
                <span className="text-lg font-bold card-title mt-2">{name}</span>
                {children}
                <h4>
                    &ensp;
                    <span className="font-normal">{shortdesc}</span>
                </h4>
                <h4 className="absolute bottom-0 right-4 font-heading">
                    Comments:&ensp;
                    <span className="mr-2 font-normal ">{comments}</span>
                    Likes:&ensp;
                    <span className="font-normal">{likedislike}</span>
                </h4>
                </div>
        </div>
        /*
         Change comment/like text to icons
         Potentially add functionality to copy link to post
         */
    
    )
  }
  export default PostCard;