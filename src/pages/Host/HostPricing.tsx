import { useOutletContext } from "react-router-dom";
import { VanObject } from "../../api/types";

export default function HostPricing() {
  const van = useOutletContext<VanObject>();
  return <section><h1>{`$${van.price}/day`}</h1></section>;
}
