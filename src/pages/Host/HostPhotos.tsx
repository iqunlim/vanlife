import { useOutletContext } from "react-router-dom";
import { VanObject } from "../Vans/Vans";
import classes from "../../css-modules/HostDetails.module.css"

export default function HostPhotos() {
  const van = useOutletContext<VanObject>();
  return (
    <div className={classes.photosFlex}>
      <img className={classes.photosFlexPhoto} src={van.imageUrl} />
    </div>
  );
}
