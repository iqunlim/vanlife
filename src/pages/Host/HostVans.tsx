import { useEffect, useState } from "react";
import { VanDataAll } from "../Vans/Vans";
import { Link } from "react-router-dom";

export default function HostVans() {
  const [hostVans, setHostVans] = useState<VanDataAll | null>(null);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((response) => response.json())
      .then((response) => setHostVans(response));
  }, []);

  return (
    <main className="host-vans-overview">
      <h1>Your listed vans</h1>
      {hostVans
        ? hostVans.vans.map((van) => (
            <div key={van.id} className="host-vans-entry">
              <img src={van.imageUrl} className="host-vans-img" />
              <div className="host-vans-entry-col">
                <Link to={van.id} className="host-vans-entry-link">
                  {van.name}
                </Link>
                <span className="per-day-text">{`$${van.price}/day`}</span>
              </div>
            </div>
          ))
        : null}
    </main>
  );
}
