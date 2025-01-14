import { useOutletContext } from "react-router-dom";
import { VanObject } from "../Vans/Vans";

export default function Details() {
  const van = useOutletContext<VanObject>();

  return (
    <div className="van-detail-details-nav">
      {van ? (
        <div className="van-detail-details-bottom">
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
    </div>
  );
}
