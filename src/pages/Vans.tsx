import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

export interface VanDataAll {
  vans: VanObject[];
}

export interface VanDataOne {
  vans: VanObject;
}

export interface VanObject {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: "simple" | "rugged" | "luxury";
}

export default function Vans() {
  const [vanData, setVanData] = React.useState<VanDataAll | null>(null);
  React.useEffect(() => {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((vans: VanDataAll) => setVanData(vans));
  }, []);

  return (
    <main className="van-page">
      <h1>Explore our van options</h1>
      <div className="van-filter">
        <div className="sm-button manila-button">Simple</div>
        <div className="sm-button manila-button">Rugged</div>
        <div className="sm-button manila-button">Luxury</div>
        <a className="van-filter-clear" href="#">
          Clear filters
        </a>
      </div>
      <div className="options">
        {vanData ? (
          vanData.vans?.map((van) => (
            <div key={van.id} className={`options-container-${van.id}`}>
              <Link className="no-deco" to={`/vans/${van.id}`}>
                <img className="options-img" src={van.imageUrl} />
                <div className="options-subcomponent">
                  <span className="van-text">{van.name}</span>
                  <span className="van-text">${van.price}</span>
                </div>
                <div className="options-subcomponent">
                  <div
                    className={clsx({
                      "options-button": true,
                      "sm-button": true,
                      "orange-button": van.type == "simple",
                      "green-button": van.type == "rugged",
                      "black-button": van.type == "luxury",
                    })}
                  >
                    {van.type.charAt(0).toUpperCase() +
                      String(van.type).slice(1)}
                  </div>
                  <span className="day-text">/day</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </main>
  );
}
