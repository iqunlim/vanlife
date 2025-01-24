import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css-modules/HostVans.module.css"
import { getHostVans } from "../../api/api";
import { VanObject } from "../../api/types";

/**
 * Host Vans List reusable component
 * @param hostId: The logged in hosts ID
 * @param count: Count of vans you wish to have listed
 * @param showedit: show the edit buttons to the right of the van
 */
export default function HostVans({ hostId, count, showedit }: { hostId: string, count?: number, showedit?: boolean }) {
  const [hostVans, setHostVans] = useState<VanObject[] | null>(null);

  useEffect(() => {
    // If it becomes too expensive to get all of the vans, add a count to getHostVans
    getHostVans(hostId)
      .then((response) => setHostVans(response));
  }, [hostId]);

  return (
    <main className={classes.hostVansOverview}>
      {/*  Maps over all elements and then just returns the number we want */}
      {hostVans
        ? hostVans.map((van) => (
          <div key={van.id} className={classes.hostVansEntry}>
            <div className={classes.hostVansContainer}>
              <img src={van.imageUrl} className={classes.hostVansImg} />
              <div className={classes.hostVansEntryCol}>
                <Link to={`/host/vans/${van.id}`} className={classes.hostVansEntryLink}>
                  {van.name}
                </Link>
                <span className={classes.perDayText}>{`$${van.price}/day`}</span>
              </div>
            </div>
            <div>
              {showedit && <Link to="edit" className={classes.hostVansEntryLink}>Edit</Link>}
            </div>
          </div>
        )).slice(0, count ? count : hostVans.length)
        : null}
    </main>
  );
}
