import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css-modules/HostVans.module.css"
import { getHostVans } from "../../api/api";
import { VanObject } from "../../api/types";

export default function HostVans({ hostId }: { hostId: string }) {
  const [hostVans, setHostVans] = useState<VanObject[] | null>(null);

  useEffect(() => {
    getHostVans(hostId)
      .then((response) => setHostVans(response));
  }, [hostId]);

  return (
    <main className={classes.hostVansOverview}>
      <h1>Your listed vans</h1>
      {hostVans
        ? hostVans.map((van) => (
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
