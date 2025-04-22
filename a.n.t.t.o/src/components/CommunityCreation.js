export default function CommunityCreation() {
  return (
    <div className="my-4 card rounded-none lg:card-side bg-base-100 shadow">
        <form>
            <div className="my-4 ml-5 card rounded-none lg:card-side bg-base-100 shadow">
                <input type="text" id="ptitle" name="ptitle" placeholder="Community Name"></input><br></br>
            </div>
            <div className="my-4 ml-5 card rounded-none lg:card-side bg-base-100 shadow">
                <textarea rows="4" cols="73" placeholder="Give a description of your community" id="pcontent" name="pcontent"></textarea><br></br>
            </div>
            <div className="my-8 ml-6 card rounded-none lg:card-side bg-base-100">
            {/* Attach Button */}
            <button type="submit" className="inline-flex items-center  text-base-100 absolute -bottom-4 bg-primary hover:bg-secondary  hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F1B53D" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                </svg>
            Give your community an icon</button>
            {/* Post Button */}
            <button type="submit" className="inline-flex items-center  text-base-100 absolute end-2.5 -bottom-4 -right-0.5 bg-primary hover:bg-secondary  hover:border focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-base px-6 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#F1B53D" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            Create!</button>
            </div>
        </form>
    </div>
    
  )
}