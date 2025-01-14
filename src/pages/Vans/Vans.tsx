import React, { useState } from "react";
import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";
import { APIError, getVansFromAPI } from "../../api.ts";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const [loading, setLoading] = useState<boolean>(false);
  const [vanData, setVanData] = useState<VanDataAll | null>(null);
  const [error, setError] = useState<APIError | null>(null);
  React.useEffect(() => {
    async function GetData() {
      setLoading(true);
      getVansFromAPI()
        .then((vans: VanDataAll) => setVanData(vans))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
    GetData();
  }, []);

  const vanDataFiltered =
    typeFilter && vanData
      ? vanData.vans.filter((van) => van.type.toLowerCase() === typeFilter)
      : vanData?.vans;

  // one way to generate search params
  /* function genNewSearchParamString(key: string, value: string) {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete("type");
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  }*/

  // another way
  // problems: if queryparams are like ?type=simple&type=luxury
  // you would have to do extra logic
  function handleFilterChange(key: string, value: string | null) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <h2 aria-live="polite">Loading...</h2>;
  }

  if (error) {
    console.log(error);
    return (
      <h2 aria-live="assertive">{`There was an error: ${error.message}`}</h2>
    );
  }
  return (
    <main className="van-page">
      <h1>Explore our van options</h1>
      <div className="van-filter">
        <button
          className={clsx({
            "sm-button": true,
            "manila-button": typeFilter != "simple",
            "orange-onhover-button": typeFilter != "simple",
            "orange-button": typeFilter == "simple",
          })}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </button>
        <button
          className={clsx({
            "sm-button": true,
            "manila-button": typeFilter != "rugged",
            "green-onhover-button": typeFilter != "rugged",
            "green-button": typeFilter == "rugged",
          })}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          Rugged
        </button>
        <button
          className={clsx({
            "sm-button": true,
            "manila-button": typeFilter != "luxury",
            "black-onhover-button": typeFilter != "luxury",
            "black-button": typeFilter == "luxury",
          })}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          Luxury
        </button>
        {typeFilter ? (
          <button
            className="van-filter-clear"
            onClick={() => handleFilterChange("type", null)}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="options">
        {vanDataFiltered ? (
          vanDataFiltered.map((van) => (
            <div key={van.id} className={`options-container-${van.id}`}>
              <Link
                className="no-deco"
                to={van.id}
                state={{
                  search: searchParams.toString(),
                  type: typeFilter,
                }}
              >
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
          <h2>No vans found. Add some!</h2>
        )}
      </div>
    </main>
  );
}
