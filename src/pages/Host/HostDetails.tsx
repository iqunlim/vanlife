import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VanObject } from "../Vans/Vans";

export default function Details() {
  const [van, setHostVan] = useState<VanObject | null>(null);
  const params = useParams();
  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((response) => response.json())
      .then((response) => setHostVan(response.vans));
  }, [params.id]);
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
