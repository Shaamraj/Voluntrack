import { Link } from "react-router-dom";
import { ShieldCheck, Users, CalendarDays, Wallet, Clock3 } from "lucide-react";
import { fundingData, ngoApplicationApi, eventApi } from "../services/api";
export default function AdminDashboard() {
    const pending = ngoApplicationApi.list().filter(x => x.status === "PENDING").length;
    return <main className="section dashboard">
    <div className="container">
    <div className="dash-head">
    <div>
    <span className="eyebrow">ADMINISTRATION</span>
    <h1>Platform overview</h1>
    <p>Monitor organizations, opportunities and community impact.</p>
    </div>
    <Link className="btn btn-primary" to="/admin/ngos">Review NGOs</Link>
    </div>
    <div className="metric-grid">{[["Volunteers", 250, Users], ["Verified NGOs", 35, ShieldCheck], ["Active Events", eventApi.list().length, CalendarDays], ["Service Hours", "10K+", Clock3], ["CSR Funding", `₹${(fundingData.reduce((a, x) => a + x.amount, 0) / 1000).toFixed(0)}K`, Wallet]].map(([t, v, I]) => <div className="metric" key={t}>
        <span className="metric-icon">
        <I />
        </span>
        <small>{t}</small>
        <strong>{v}</strong>
        </div>)}</div>
    <div className="admin-callout">
    <div>
    <ShieldCheck />
    <div>
    <strong>NGO verification queue</strong>
    <p>{pending} pending applications need review.</p>
    </div>
    </div>
    <Link className="btn btn-outline" to="/admin/ngos">Open queue</Link>
    </div>
    <div className="panel">
    <div className="panel-head">
    <h2>Recent activity</h2>
    </div>{["New NGO application received", "Volunteer registration completed", "Event capacity reached", "CSR funding record added"].map((x, i) => <div className="activity" key={x}>
        <span>{i + 1}</span>
        <div>
        <strong>{x}</strong>
        <small>Today · VolunTrack platform</small>
        </div>
        </div>)}</div>
    </div>
    </main>;
}

