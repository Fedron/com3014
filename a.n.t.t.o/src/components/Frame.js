export default function Frame({ children, imageUrl, pageTitle }) {

    return (
        <div className="box-content h-fit w-full border-2 border-primary my-12">
            <div className="w-full h-12 bg-secondary relative">
                <h1 className="absolute text-lg font-semibold font-heading top-2 left-3 text-base-100">{pageTitle}</h1>
            </div>
            {imageUrl ? (
                <div style={{backgroundImage: `url(/images/banners/${imageUrl})`}} className="relative w-full h-32 justify-center bg-no-repeat bg-cover bg-center"></div>
            ) : (
                <>
                </>
            )}
            {children}
        </div>
    );
}