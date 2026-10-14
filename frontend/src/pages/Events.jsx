import { useMemo, useState } from "react";
import EventCard from "../components/EventCard";
import { eventApi } from "../services/api";
export default function Events() {
    const [q, setQ] = useState(""), [cat, setCat] = useState("All");
    const events = eventApi.list();
    const cats = ["All", ...new Set(events.map(e => e.category))];
    const filtered = useMemo(() => events.filter(e => (cat === "All" || e.category === cat) && (`${e.title} ${e.location} ${e.description} ${e.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase()))), [events, q, cat]);
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">DISCOVER</span>
    <h1>Volunteer opportunities</h1>
    <p>Find an event where your time and skills can make a real difference.</p>
    </div>
    <div className="filters">
    <input placeholder="Search events, skills or locations..." value={q} onChange={e => setQ(e.target.value)}/>
    <select value={cat} onChange={e => setCat(e.target.value)}>{cats.map(c => <option key={c}>{c}</option>)}</select>
    </div>{filtered.length ? <div className="event-grid">{filtered.map(e => <EventCard key={e.id} event={e}/>)}</div> : <div className="empty">
        <h3>No events found</h3>
        <p>Try another search or category.</p>
        </div>}</div>
    </main>;
}

