import { useOutletContext } from "react-router-dom";
import HostVans from "./HostVans";

export default function hostVansOverview() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hostId = useOutletContext<string>();
    return (
        <div style={{ margin: "1rem" }}>
            <h2>Your vans</h2>
            <HostVans hostId={hostId} />
        </div>
    )
}