import React from "react";
import clsx from "clsx";

interface VanData {
  vans?: VanObject[];
}

interface VanObject {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: "simple" | "rugged" | "luxury";
}

export default function Vans() {
  const [vanData, setVanData] = React.useState<VanData>({});
  React.useEffect(() => {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((vans: VanData) => setVanData(vans));
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
        {vanData.vans?.map((van) => (
          <div className={`options-container-${van.id}`} key={van.id}>
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
                {van.type.charAt(0).toUpperCase() + String(van.type).slice(1)}
              </div>
              <span className="day-text">/day</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
