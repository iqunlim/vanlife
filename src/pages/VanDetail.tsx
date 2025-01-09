import React from "react";
import { useParams } from "react-router-dom";
import { VanDataOne, VanObject } from "./Vans";

export default function VanDetail() {
  const [van, setVanDetal] = React.useState<VanObject | null>(null);
  const params = useParams();

  async function fetchOneVan(id: string | undefined): Promise<VanDataOne> {
    if (typeof id === "undefined") {
      throw new TypeError("fetchOneVan: id is undefined");
    }
    return fetch(`/api/vans/${id}`).then((response) => response.json());
  }

  React.useEffect(() => {
    fetchOneVan(params.id).then((response) => setVanDetal(response.vans));
  }, [params.id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button orange-button wide-button">
            Rent this van
          </button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
