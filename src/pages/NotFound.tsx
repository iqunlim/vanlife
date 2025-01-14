import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <h1>Sorry, the page you were looking for was not found</h1>
      <Link to="/" className="wide-button black-button">
        Return to Home
      </Link>
    </div>
  );
}
