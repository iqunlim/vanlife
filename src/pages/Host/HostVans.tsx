import { useEffect, useState } from "react";
import { VanDataAll } from "../Vans/Vans";
import { Link } from "react-router-dom";
import classes from "../../css-modules/HostVans.module.css"

export default function HostVans() {
  const [hostVans, setHostVans] = useState<VanDataAll | null>(null);

  useEffect(() => {
    fetch("/api/host/vans")
      .then((response) => response.json())
      .then((response) => setHostVans(response));
  }, []);

  return (
    <main className={classes.hostVansOverview}>
      <h1>Your listed vans</h1>
      {hostVans
        ? hostVans.vans.map((van) => (
          <div key={van.id} className={classes.hostVansEntry}>
            <img src={van.imageUrl} className={classes.hostVansImg} />
            <div className={classes.hostVansEntryCol}>
              <Link to={van.id} className={classes.hostVansEntryLink}>
                {van.name}
              </Link>
              <span className={classes.perDayText}>{`$${van.price}/day`}</span>
            </div>
          </div>
        ))
        : null}
    </main>
  );
}
