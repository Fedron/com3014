export default function HomeImage() {
    return (
        <>
            <div className="relative w-full hero h-72" style={{backgroundImage: 'url(/images/banners/uni.jpg)'}}>
                <div className="hero-overlay h-[15%] absolute top-0 left-0 bg-base-100 bg-opacity-50"></div>
                    <div className="text-left hero-content">
                        <div className="max-w-md">
                            <h1 className="absolute text-xl font-semibold font-heading top-2 left-3 text-primary">Welcome!</h1>
                        </div>
                    </div>
            </div>
        </>
    )
}
