export default function Filter({ id, children, filterName }) {

return (
  <div className="my-2 drop-shadow-xl collapse collapse-arrow border border-neutral-focus rounded-lg bg-base-100 w-full">
    <input type="checkbox" id={id} />
      <div className="collapse-title text-sm font-medium">
        {filterName}
      </div>
    <div className="collapse-content">
      <div className="form-control">
        {children}
      </div>
    </div>
  </div>

);
}
