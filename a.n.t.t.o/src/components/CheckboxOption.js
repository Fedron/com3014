export default function CheckboxOption({ option }) {

return (
    <div className="my-2 drop-shadow-xl collapse collapse-arrow border border-neutral-focus rounded-lg bg-base-100 w-full">
        <label className="cursor-pointer label">
            <div className="ml-2.5 label-text font-light">{option}</div>
            <input type="checkbox" className="rounded checkbox-xs checkbox mr-2"/>
        </label>
    </div>
);
}
