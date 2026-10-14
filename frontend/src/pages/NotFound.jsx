import { Link } from "react-router-dom";
export default function NotFound() {
    return <main className="empty-page">
    <h1>404</h1>
    <h2>Page not found</h2>
    <p>We couldn't find that page.</p>
    <Link className="btn btn-primary" to="/">Back Home</Link>
    </main>;
}

