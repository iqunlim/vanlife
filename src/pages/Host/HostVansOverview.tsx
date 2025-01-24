import HostVans from "./HostVans";

export default function hostVansOverview({ hostId }: { hostId: string }) {
    return (
        <div style={{ margin: "1rem" }}>
            <h2>Your vans</h2>
            <HostVans hostId={hostId} />
        </div>
    )
}