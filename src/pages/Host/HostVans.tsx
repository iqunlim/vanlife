import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../../css-modules/HostVans.module.css"
import { getHostVans } from "../../api/items/vans-items";
import { VanObject } from "../../api/types";
import Modal from "../../components/Modal";

/**
 * Host Vans List reusable component
 * @param hostId: The logged in hosts ID
 * @param count: Count of vans you wish to have listed
 * @param showedit: show the edit buttons to the right of the van
 */
export default function HostVans({ hostId, count, showedit }: { hostId: string, count?: number, showedit?: boolean }) {
  const [hostVans, setHostVans] = useState<VanObject[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // If it becomes too expensive to get all of the vans, add a count to getHostVans
    getHostVans(hostId)
      .then((response) => setHostVans(response));
  }, [hostId]);

  return (
    <main className={classes.hostVansOverview}>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <p style={{ textAlign: "center" }}>This feature is not implemented in the display version of this website.</p>
      </Modal>
      {/*  Maps over all elements and then just returns the number we want */}
      {hostVans && hostVans.length > 0
        ? hostVans.map((van) => (
          <div key={van.id} className={classes.hostVansEntry}>
            <div className={classes.hostVansContainer}>
              <img
                src={van.imageUrl}
                className={classes.hostVansImg}
              />
              <div className={classes.hostVansEntryCol}>
                <Link
                  to={`/host/vans/${van.id}`}
                  className={classes.hostVansEntryLink}
                >
                  {van.name}
                </Link>
                <span className={classes.perDayText}>
                  {`$${van.price}/day`}
                </span>
              </div>
            </div>
            <div>
              {showedit &&
                <button
                  onClick={() => setShowModal(true)}
                  className={classes.hostVansEntryLink}
                >
                  Edit
                </button>}
            </div>
          </div>
        )).slice(0, count ? count : hostVans.length)
        : <h1 className={classes.noVansAlert}>You have no vans. Add some!</h1>}
    </main>
  );
}
