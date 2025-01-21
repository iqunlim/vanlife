import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { VanDataOne, VanObject } from "./Vans";
import { BsArrowLeft } from "react-icons/bs";
import classes from "../../css-modules/VanDetail.module.css"
import clsx from "clsx";

export default function VanDetail() {
  const [van, setVanDetal] = React.useState<VanObject | null>(null);
  const params = useParams();
  const location = useLocation();
  console.log(location);

  async function fetchOneVan(id: string | undefined): Promise<VanDataOne> {
    if (typeof id === "undefined") {
      throw new TypeError("fetchOneVan: id is undefined");
    }
    return fetch(`/api/vans/${id}`).then((response) => response.json());
  }

  React.useEffect(() => {
    fetchOneVan(params.id).then((response) => setVanDetal(response.vans));
  }, [params.id]);

  const backLocationState =
    location != null && location.key != "default"
      ? `..?${location.state.search}`
      : "..";

  const type = location.state?.type || "all";

  return (
    <div className={classes.vanDetailContainer}>
      <div className={classes.backFlex}>
        <BsArrowLeft />
        <Link to={backLocationState} relative="path" className={classes.back}>
          {`Back to ${type} vans`}
        </Link>
      </div>
      {van ? (
        <div className={classes.vanDetail}>
          <img src={van.imageUrl} />
          <i className={clsx({
            "sm-button": true,
            "orange-button": van.type === "simple",
            "green-button": van.type === "rugged",
            "black-button": van.type === "luxury",
          })}>{van.type}</i>
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
