import { CSSProperties, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { VanDataOne, VanObject } from "../Vans/Vans";
import clsx from "clsx";
import classes from "../../css-modules/HostDetails.module.css"

export default function HostVanDetailsLayout() {
  const params = useParams();
  const [van, setVanDetail] = useState<VanObject | null>(null);
  async function fetchOneVan(id: string | undefined): Promise<VanDataOne> {
    if (typeof id === "undefined") {
      throw new TypeError("fetchOneVan: id is undefined");
    }
    return fetch(`/api/host/vans/${id}`).then((response) => response.json());
  }

  useEffect(() => {
    fetchOneVan(params.id).then((response) => setVanDetail(response.vans));
  }, [params.id]);

  const navStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  const activeNavStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? navStyle : undefined;

  return (
    <main className={classes.vanDetailPage}>
      <div className={classes.back}>
        <BsArrowLeft />
        <Link className={classes.linkBack} to=".." relative="path">
          Back to all vans
        </Link>
      </div>
      {van ? (
        <div className={classes.vanDetailDetails}>
          <div className={classes.vanDetailDetailsTop}>
            <img className={classes.vanDetailDetailsImg} src={van.imageUrl} />
            <div className={classes.vanDetailDetailsTopSide}>
              <div
                className={clsx({
                  "sm-button": true,
                  "orange-button": van.type == "simple",
                  "green-button": van.type == "rugged",
                  "black-button": van.type == "luxury",
                })}
              >
                {van.type}
              </div>
              <h2 className={classes.vanDetailDetailsH2}>Modest Explorer</h2>
              <span className={classes.perDayText}>{`$${van.price}/day`}</span>
            </div>
          </div>
          <nav className={classes.hostNav}>
            <NavLink style={activeNavStyle} to="." end>
              Details
            </NavLink>
            <NavLink style={activeNavStyle} to="pricing">
              Pricing
            </NavLink>
            <NavLink style={activeNavStyle} to="photos">
              Photos
            </NavLink>
          </nav>
          <Outlet context={van} />
        </div>
      ) : null}
    </main>
  );
}
