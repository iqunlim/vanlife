import classes from "../../css-modules/Dashboard.module.css"
import HostVans from "./HostVans";

export default function Dashboard({ hostId }: { hostId: string }) {
  return (
    <>
      <div className="top">
        <h2> Welcome
        </h2>
        <h3> Income last <i>30 days</i>
        </h3>
        <h1>
          $2,260
        </h1>
      </div>
      <div className="review">
        Review Score
      </div>
      <HostVans hostId={hostId} count={3} />
    </>
  );
}
