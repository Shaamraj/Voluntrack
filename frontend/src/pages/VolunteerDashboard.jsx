import { Link } from "react-router-dom";
import { CalendarDays, Clock3, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { eventApi, registrationApi } from "../services/api";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
export default function VolunteerDashboard() {
    const { user } = useAuth();
    const regs = registrationApi.list().filter(r => r.volunteerId === user.id);
    const events = regs.map(r => eventApi.get(r.eventId)).filter(Boolean);
    const data = [{ m: "May", h: 3 }, { m: "Jun", h: 5.5 }, { m: "Jul", h: 2 }, { m: "Aug", h: 4 }, { m: "Sep", h: 4 }, { m: "Oct", h: 6 }];
    return <main className="section dashboard">
    <div className="container">
    <div className="dash-head">
    <div>
    <span className="eyebrow">VOLUNTEER DASHBOARD</span>
    <h1>Welcome back, {user.name?.split(" ")[0]} 👋</h1>
    <p>Keep building your impact, one opportunity at a time.</p>
    </div>
    <Link className="btn btn-primary" to="/events">Find an Event <ArrowRight size={17}/>
    </Link>
    </div>
    <div className="metric-grid">{[["Upcoming Events", events.length, CalendarDays], ["Completed Events", 4, CheckCircle2], ["Service Hours", user.hours || 18.5, Clock3], ["Skills", user.skills?.length || 2, CheckCircle2]].map(([t, v, I]) => <div className="metric" key={t}>
        <span className="metric-icon">
        <I />
        </span>
        <small>{t}</small>
        <strong>{v}</strong>
        </div>)}</div>
    <div className="dash-grid">
    <section className="panel">
    <div className="panel-head">
    <h2>Upcoming events</h2>
    <Link to="/events">Explore all</Link>
    </div>{events.length ? events.map(e => <div className="list-event" key={e.id}>
        <img src={e.image} alt=""/>
        <div>
        <strong>{e.title}</strong>
        <span>{e.date} · {e.location}</span>
        </div>
        <span className="status confirmed">Confirmed</span>
        </div>) : <div className="empty small">
        <p>No upcoming registrations.</p>
        <Link to="/events">Find an event</Link>
        </div>}</section>
    <section className="panel">
    <div className="panel-head">
    <h2>Volunteer hours</h2>
    <span>This year</span>
    </div>
    <div className="chart">
    <ResponsiveContainer width="100%" height={230}>
    <AreaChart data={data}>
    <XAxis dataKey="m"/>
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="h" fillOpacity={0.18} strokeWidth={3}/>
    </AreaChart>
    </ResponsiveContainer>
    </div>
    </section>
    </div>
    </div>
    </main>;
}

