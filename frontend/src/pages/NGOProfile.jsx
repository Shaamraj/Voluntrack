import { useParams, Link } from "react-router-dom";
import { CheckCircle2, MapPin } from "lucide-react";
import { ngoApi, eventApi } from "../services/api";
import EventCard from "../components/EventCard";
export default function NGOProfile() {
    const { id } = useParams();
    const ngo = ngoApi.get(id);
    const events = eventApi.list().filter(e => e.ngoId === id);
    if (!ngo)
        return <main className="section">
        <div className="container">
        <h2>NGO not found</h2>
        </div>
        </main>;
    return <main className="section">
    <div className="container">
    <div className="profile-hero">
    <div className="ngo-avatar large-avatar">{ngo.name.split(" ").map(x => x[0]).slice(0, 2).join("")}</div>
    <div>
    <div className="verified">
    <CheckCircle2 size={15}/> Verified organization</div>
    <h1>{ngo.name}</h1>
    <span>
    <MapPin size={15}/> {ngo.location}</span>
    <p>{ngo.description}</p>
    </div>
    </div>
    <h2>Upcoming events</h2>
    <div className="event-grid">{events.map(e => <EventCard key={e.id} event={e}/>)}</div>
    </div>
    </main>;
}

