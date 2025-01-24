import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css-modules/HostVans.module.css"
import { getHostVans } from "../../api/api";
import { VanObject } from "../../api/types";

/**
 * Host Vans List reusable component
 * @param hostId: The logged in hosts ID
 * @param count: Count of vans you wish to have listed
 */
export default function HostVans({ hostId, count }: { hostId: string, count?: number }) {
  const [hostVans, setHostVans] = useState<VanObject[] | null>(null);

  useEffect(() => {
    // If it becomes too expensive to get all of the vans, add a count to getHostVans
    getHostVans(hostId)
      .then((response) => setHostVans(response));
  }, [hostId]);

  return (
    <main className={classes.hostVansOverview}>
      <h2>Your listed vans</h2>
      {/*  Maps over all elements and then just returns the number we want */}
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
        )).slice(0, count ? count : hostVans.length)
        : null}
    </main>
  );
}
