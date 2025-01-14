import { CSSProperties, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { VanDataOne, VanObject } from "../Vans/Vans";
import clsx from "clsx";

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
    <main className="van-detail-page">
      <div className="back">
        <BsArrowLeft />
        <Link className="link-back" to=".." relative="path">
          Back to all vans
        </Link>
      </div>
      {van ? (
        <div className="van-detail-details">
          <div className="van-detail-details-top">
            <img className="van-detail-details-img" src={van.imageUrl} />
            <div className="van-detail-details-top-side">
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
              <h2 className="van-detail-details-h2">Modest Explorer</h2>
              <span className="per-day-text">{`$${van.price}/day`}</span>
            </div>
          </div>
          <div className="van-detail-details-nav"></div>
          <nav className="host-nav">
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
