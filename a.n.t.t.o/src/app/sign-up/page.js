import Link from 'next/link'

export default function SignUp() {
    return (
       <div className="flex w-full my-32 justify-center">
            <div className ="image ">
                <figure>
                    <img
                        className =" mx-28 my-14 max-w-xl max-h-max"
                        src="/images/sign-up_img.png"
                        alt="sign-up_image" />
                </figure>
            </div>
            <div className="divider divider-horizontal  h-[25.5rem] divider-neutral mx-20"></div>
            <div className="form mx-36 -my-20">
                <div className="mt-16 font-heading text-primary text-center" >
                    <div className="text-lg font-semibold my-8 ">Sign up</div>
                    <div className="inline-block w-96">
                        <label className="input input-bordered flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="text" className="grow" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-4 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Password" value="" />
                        </label>
                        <label className="input input-bordered flex items-center gap-4 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="Confirm Password" value="" />
                        </label>
                        <div className="text-sm mt-4 mb-8 text-center ">By signing up, you agree to our&nbsp;
                            <a className="link">Terms of Use</a>&nbsp;and&nbsp;
                            <a className="link">Privacy Policy</a>.
                        </div>
                        <button className="btn btn-sm btn-primary text-base-100 w-full">SIGN UP</button>
                        <div className="divider font-medium text-sm">OR</div>
                        <button className="btn btn-sm btn-outline btn-primary font-medium w-full">
                            <Link href="/sign-in">HAVE AN ACCOUNT? SIGN IN HERE!</Link>
                        </button>
                    </div>
                </div>
            </div> 
       </div>
        
    )
}