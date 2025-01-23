import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import classes from "../../css-modules/VanDetail.module.css"
import clsx from "clsx";
import { getVan } from "../../api/api";
import { VanObject } from "../../api/types";

export default function VanDetail() {
  const [van, setVanDetal] = React.useState<VanObject | null>(null);
  const params = useParams();
  const location = useLocation();

  async function fetchOneVan(id: string | undefined) {
    if (typeof id === "undefined") {
      throw new TypeError("fetchOneVan: id is undefined");
    }
    return getVan(id);
  }

  // TODO: Error handling on the page
  // Do a catch and then setError with a state error thing
  // See Vans.tsx
  // Use APIError type
  React.useEffect(() => {
    fetchOneVan(params.id).then((response) => setVanDetal(response));
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
