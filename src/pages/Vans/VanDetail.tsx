import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import classes from "../../css-modules/VanDetail.module.css"
import clsx from "clsx";
import { getVan } from "../../api/items/vans-items";
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
          <p className={clsx({
            "sm-button": true,
            "orange-button": van.type === "simple",
            "green-button": van.type === "rugged",
            "black-button": van.type === "luxury",
          })}>{van.type}</p>
          <h2>{van.name}</h2>
          <p className={classes.vanPrice}>
            <span>${van.price}</span>/day
          </p>
          <p className={classes.description}>{van.description}</p>
          <button
            className={`${classes.linkButton} orange-button wide-button`}
          >
            Rent this van
          </button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
