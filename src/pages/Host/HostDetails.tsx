import { useOutletContext } from "react-router-dom";
import classes from "../../css-modules/HostDetails.module.css"
import { VanObject } from "../../api/types";

export default function Details() {
  const van = useOutletContext<VanObject>();

  return (
    <main>
      {van ? (
        <div className={classes.vanDetailDetails}>
          <div>
            <strong>Name: </strong>
            <span>{van.name}</span>
          </div>
          <div>
            <strong>Category: </strong>
            <span>{van.type}</span>
          </div>
          <div>
            <strong>Description: </strong>
            <span>{van.description}</span>
          </div>
          <div>
            <strong>Visibility: </strong>
            <span>Public</span>
          </div>
        </div>
      ) : null}
    </main>
  );
}
