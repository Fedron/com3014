function UserCard({imageUrl,name}) {
    return (
        <div className="card card-side w-full bg-base-100 shadow-sm">
            <figure>
                <img
                className="rounded-full"
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
           
            </div>
        </div>
    //     <div className="my-2 drop-shadow-xl collapse collapse-arrow border border-neutral-focus rounded-lg bg-base-100 w-full">
    //     {/* <input type="checkbox" id={id} /> */}
    //       <div className="collapse-title text-sm font-medium">
    //         {name}
    //       </div>
    //     <div className="collapse-content">
    //       <div className="form-control">
    //         {/* {children} */}
    //       </div>
    //     </div>
    //   </div>
    )
  }
  export default UserCard;