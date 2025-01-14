import { useOutletContext } from "react-router-dom";
import { VanObject } from "../Vans/Vans";

export default function HostPhotos() {
  const van = useOutletContext<VanObject>();
  return (
    <div className="photos-flex">
      <img className="photos-flex-photo" src={van.imageUrl} />
    </div>
  );
}
