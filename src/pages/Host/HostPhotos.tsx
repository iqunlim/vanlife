import { useOutletContext } from "react-router-dom";
import classes from "../../css-modules/HostDetails.module.css"
import { VanObject } from "../../api/types";

export default function HostPhotos() {
  const van = useOutletContext<VanObject>();
  return (
    <div className={classes.photosFlex}>
      <img className={classes.photosFlexPhoto} src={van.imageUrl} />
    </div>
  );
}
