function SkillCard({imageUrl,cardTitle}) {
  return (
    <div className="card card-compact w-11/12 h-full bg-base-100 shadow-xl ">
      <a href="#!">   
        <div style={{backgroundImage: `url(/images/${imageUrl})`}} className=" h-40 w-full rounded-t-lg justify-center bg-no-repeat bg-cover bg-center"></div>  
      </a>
      <div className="card-body h-20">
        <h6 className="card-title font-normal">{cardTitle}</h6>
      </div>
    </div>
  
  )
}
export default SkillCard;