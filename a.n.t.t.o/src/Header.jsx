import './index.css'
function Header(){

    return (
        <header>
            <h1>My website</h1>
            <h1 className="text-red-500">My website</h1>
            <nav>
                <ul>
                <button className="btn btn-soft">Default</button>
                <button className="btn btn-soft btn-primary">Primary</button>
                <button className="btn btn-soft btn-secondary">Secondary</button>
                <button className="btn btn-soft btn-accent">Accent</button>
                <button className="btn btn-soft btn-info">Info</button>
                <button className="btn btn-soft btn-success">Success</button>
                <button className="btn btn-soft btn-warning">Warning</button>
                <button className="btn btn-soft btn-error">Error</button>
                </ul>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header