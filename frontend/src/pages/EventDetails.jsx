import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import { eventApi, ngoApi, registrationApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function EventDetails() {
    const { id } = useParams();
    const e = eventApi.get(id);
    const ngo = e && ngoApi.get(e.ngoId);
    const { user } = useAuth();
    const nav = useNavigate();
    const [msg, setMsg] = useState("");
    const [registered, setRegistered] = useState(user && registrationApi.list().some(r => r.eventId === id && r.volunteerId === user.id));
    if (!e)
        return <main className="section">
        <div className="container">
        <h2>Event not found</h2>
        </div>
        </main>;
    const register = () => {
        if (!user) {
            nav("/login");
            return;
        }
        if (user.role !== "volunteer") {
            setMsg("Only volunteers can register for events.");
            return;
        }
        try {
            registrationApi.register(id, user.id);
            setRegistered(true);
            setMsg("Registration successful! Your spot is confirmed.");
        }
        catch (err) {
            setMsg(err.message);
        }
    };
    const cancel = () => { registrationApi.cancel(id, user.id); setRegistered(false); setMsg("Registration cancelled."); };
    return <main className="section">
    <div className="container">
    <Link className="back" to="/events">
    <ArrowLeft size={16}/> Back to events</Link>
    <div className="detail-grid">
    <div>
    <img className="detail-image" src={e.image} alt=""/>
    <div className="detail-content">
    <span className="category inline">{e.category}</span>
    <h1>{e.title}</h1>
    <div className="event-ngo large">{ngo?.name}<CheckCircle2 size={16}/>
    </div>
    <p className="lead">{e.description}</p>
    <div className="detail-info">
    <span>
    <CalendarDays /> {e.date}</span>
    <span>
    <Clock /> {e.start} – {e.end}</span>
    <span>
    <MapPin /> {e.location}</span>
    </div>
    <h3>About this opportunity</h3>
    <p>This volunteering opportunity is organized by a verified NGO. Volunteers will work with the event team and contribute to a structured community activity.</p>
    <h3>Skills needed</h3>
    <div className="skills">{e.skills.map(s => <span key={s}>{s}</span>)}</div>
    </div>
    </div>
    <aside className="registration-card">
    <span className="eyebrow">JOIN THE EVENT</span>
    <h2>Reserve your spot</h2>
    <div className="big-number">{e.capacity - e.registered}</div>
    <span>spots available</span>
    <div className="progress">
    <span style={{ width: `${e.registered / e.capacity * 100}%` }}/>
    </div>
    <p>{e.registered} of {e.capacity} places filled</p>
    <div className="mini-list">
    <span>
    <Users /> {e.capacity} total capacity</span>
    <span>CSR reserved: {e.csrReserved}</span>
    </div>{msg && <div className="alert success">{msg}</div>}{registered ? <button className="btn btn-outline full" onClick={cancel}>Cancel Registration</button> : <button className="btn btn-primary full" disabled={e.registered >= e.capacity} onClick={register}>{e.registered >= e.capacity ? "Event Full" : "Register Now"}</button>}</aside>
    </div>
    </div>
    </main>;
}

