import { CalendarDays, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ngoApi } from "../services/api";
export default function EventCard({ event }) {
    const ngo = ngoApi.get(event.ngoId);
    const pct = Math.min(100, Math.round(event.registered / event.capacity * 100));
    return <article className="event-card">
  <div className="event-image">
    <img src={event.image} alt=""/>
    <span className="category">{event.category}</span>
    </div>
  <div className="event-body">
    <div className="event-ngo">{ngo?.name}<CheckCircle2 size={14}/>
    </div>
    <h3>{event.title}</h3>
    <div className="event-meta">
    <span>
    <CalendarDays size={15}/>{event.date} · {event.start}</span>
    <span>
    <MapPin size={15}/>{event.location}</span>
    </div>
    <p>{event.description}</p>
  <div className="progress-label">
    <span>Capacity</span>
    <strong>{event.registered}/{event.capacity}</strong>
    </div>
    <div className="progress">
    <span style={{ width: `${pct}%` }}/>
    </div>
    <div className="event-bottom">
    <span>
    <Users size={15}/>{event.capacity - event.registered} slots available</span>
    <Link className="text-link" to={`/events/${event.id}`}>View Details <ArrowRight size={15}/>
    </Link>
    </div>
    <div className="skills">{event.skills.map(s => <span key={s}>{s}</span>)}</div>
    </div>
    </article>;
}

