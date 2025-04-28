export default function FilterOption({ option }) {

return (
    <label className="cursor-pointer label">
        <input type="checkbox" className="rounded checkbox-xs checkbox"/>
        <div className="label-text font-light">{option}</div>
    </label>
);
}
