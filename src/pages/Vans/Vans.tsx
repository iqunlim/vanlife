import React, { useState } from "react";
import clsx from "clsx";
import { Link, useSearchParams } from "react-router-dom";
import { APIError, VanObject } from "../../api/types.ts";
import classes from "../../css-modules/Vans.module.css"
import { getVans } from "../../api/items/vans-items.ts";

export default function Vans() {

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const [loading, setLoading] = useState<boolean>(false);
  const [vanData, setVanData] = useState<VanObject[] | null>(null);
  const [error, setError] = useState<APIError | null>(null);

  React.useEffect(() => {
    async function GetData() {
      setLoading(true);
      getVans()
        .then((vans: VanObject[]) => setVanData(vans))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
    GetData();
  }, []);

  const vanDataFiltered =
    typeFilter && vanData
      ? vanData.filter((van) => van.type.toLowerCase() === typeFilter)
      : vanData;

  // Notes:
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
    console.error(error.message);
    return (
      <h2 aria-live="assertive">
        {`There was an error: ${error.statusText}`}
      </h2>
    );
  }
  return (
    <main className={classes.vanPage}>
      <h1>Explore our van options</h1>
      <div className={classes.vanFilter}>
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
            className={classes.vanFilterClear}
            onClick={() => handleFilterChange("type", null)}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className={classes.options}>
        {vanDataFiltered ? (
          vanDataFiltered.map((van) => (
            <div key={van.id} className={classes.optionsContainer}>
              <Link
                className="no-deco"
                to={van.id}
                state={{
                  search: searchParams.toString(),
                  type: typeFilter,
                }}
              >
                <img
                  className={classes.optionsImg}
                  src={van.imageUrl}
                />
                <div className={classes.optionsSubcomponent}>
                  <span className={classes.vanText}>{van.name}</span>
                  <span className={classes.vanText}>${van.price}</span>
                </div>
                <div className={classes.optionsSubcomponent}>
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
                  <span className={classes.dayText}>/day</span>
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
