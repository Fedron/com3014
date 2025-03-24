function SkillPopUp({modal_id, action, name, description, children}) {
  return (
    <><label htmlFor={modal_id} className="flex btn btn-base-100 w-fill rounded-none no-animation">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        {name}
        </label>
            <input type="checkbox" id={modal_id} className="modal-toggle" />
            <div className="modal" role="dialog">
            <div className="modal-box w-full">
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="py-4">{description}</p>
                <div className="modal-action">
                    <label htmlFor={modal_id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                </div>
                    <div>
                        {(action == "add") ? ( 
                            <div className="join rounded justify-center w-full">
                                <div>
                                    <label className="input input-bordered flex items-center join-item gap-2 !outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                        <input type="text" className="text-sm grow" placeholder="Search keywords" />
                                    </label>
                                </div>
                                <button className="btn join-item btn-primary justify-end">Find skills</button>
                            </div>
                        ) : (action == "remove") ? (
                            <div className=''>
                                {children}
                             </div>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                </div>
            </div>
    </>
  );
}
export default SkillPopUp;