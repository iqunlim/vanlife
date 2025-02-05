import { useOutletContext } from "react-router-dom";
import HostVans from "./HostVans";

export default function HostVansOverview() {
    const hostId = useOutletContext<string>();
    return (
        <section style={{ margin: "1rem", marginTop: "2em" }}>
            <h1>Your vans</h1>
            <HostVans hostId={hostId} />
        </section>
    )
}