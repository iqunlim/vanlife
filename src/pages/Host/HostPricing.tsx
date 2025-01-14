import { useOutletContext } from "react-router-dom";
import { VanObject } from "../Vans/Vans";

export default function HostPricing() {
  const van = useOutletContext<VanObject>();
  return <h1>{`$${van.price}/day`}</h1>;
}
