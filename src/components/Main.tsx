import { Link } from "react-router-dom";
export default function Main() {
  return (
    <main className="main-page">
      <h1 className="main-page-h1">
        You got the travel plans, we got the travel vans.
      </h1>
      <h2 className="main-page-h2">
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </h2>
      <Link className="wide-button find-van" to="/vans">
        Find your van
      </Link>
    </main>
  );
}
