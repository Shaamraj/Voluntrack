import { Link } from "react-router-dom";
import { Plus, Users, CalendarDays, Wallet, AlertTriangle, ArrowRight } from "lucide-react";
import { eventApi, fundingData } from "../services/api";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
export default function NGODashboard() {
    const events = eventApi.list().filter(e => e.ngoId === "ngo1");
    const total = events.reduce((a, e) => a + e.capacity, 0), reg = events.reduce((a, e) => a + e.registered, 0);
    return <main className="section dashboard">
    <div className="container">
    <div className="dash-head">
    <div>
    <span className="eyebrow">NGO DASHBOARD</span>
    <h1>Green Earth Foundation</h1>
    <p>Manage opportunities, volunteers and community impact.</p>
    </div>
    <Link className="btn btn-primary" to="/ngo/create-event">
    <Plus size={17}/> Create Event</Link>
    </div>
    <div className="metric-grid">{[["Total Events", events.length, CalendarDays], ["Total Volunteers", reg, Users], ["Available Slots", total - reg, Users], ["CSR Funding", `₹${(fundingData.reduce((a, x) => a + x.amount, 0) / 1000).toFixed(0)}K`, Wallet]].map(([t, v, I]) => <div className="metric" key={t}>
        <span className="metric-icon">
        <I />
        </span>
        <small>{t}</small>
        <strong>{v}</strong>
        </div>)}</div>
    <div className="dash-grid">
    <section className="panel">
    <div className="panel-head">
    <h2>Event readiness</h2>
    <Link to="/ngo/events">Manage events</Link>
    </div>{events.slice(0, 3).map(e => <div className="readiness" key={e.id}>
        <div>
        <strong>{e.title}</strong>
        <span>{e.registered}/{e.capacity} volunteers</span>
        </div>
        <div className="progress">
        <span style={{ width: `${e.registered / e.capacity * 100}%` }}/>
        </div>
        </div>)}</section>
    <section className="panel">
    <div className="panel-head">
    <h2>Engagement</h2>
    <span>Monthly</span>
    </div>
    <ResponsiveContainer width="100%" height={220}>
    <BarChart data={[{ m: "May", v: 30 }, { m: "Jun", v: 42 }, { m: "Jul", v: 36 }, { m: "Aug", v: 58 }, { m: "Sep", v: 64 }, { m: "Oct", v: 72 }]}>
    <XAxis dataKey="m"/>
    <YAxis />
    <Tooltip />
    <Bar dataKey="v" radius={[6, 6, 0, 0]}/>
    </BarChart>
    </ResponsiveContainer>
    </section>
    </div>
    <section className="panel">
    <div className="panel-head">
    <h2>Resource gaps</h2>
    <span className="status warning">Needs attention</span>
    </div>
    <div className="gap-grid">{[["First Aid", 5, 3], ["Registration Desk", 3, 3], ["Environmental Awareness", 6, 4]].map(x => <div className="gap-card" key={x[0]}>
        <div>
        <strong>{x[0]}</strong>
        <span>{x[2]} / {x[1]} qualified</span>
        </div>
        <div className="progress">
        <span style={{ width: `${x[2] / x[1] * 100}%` }}/>
        </div>{x[1] - x[2] > 0 ? <b>
            <AlertTriangle size={15}/> {x[1] - x[2]} needed</b> : <b className="complete">✓ Complete</b>}</div>)}</div>
    </section>
    </div>
    </main>;
}

