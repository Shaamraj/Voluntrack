import { ShieldCheck, HeartHandshake, BarChart3 } from "lucide-react";
export default function About() {
    return <main className="section">
    <div className="container narrow">
    <span className="eyebrow">ABOUT VOLUNTRACK</span>
    <h1>Technology that makes volunteering easier.</h1>
    <p className="lead">VolunTrack brings volunteers and verified NGOs together through one simple platform for discovering opportunities, managing participation and measuring community impact.</p>
    <div className="about-grid">{[[ShieldCheck, "Verified first", "NGOs go through an administrator review before their opportunities become public."], [HeartHandshake, "Built for people", "The platform keeps registration, attendance and volunteer history simple."], [BarChart3, "Measure impact", "Service hours, participation and CSR activity are visible through dashboards."]].map(([I, t, d]) => <div className="feature" key={t}>
        <span className="feature-icon">
        <I />
        </span>
        <h3>{t}</h3>
        <p>{d}</p>
        </div>)}</div>
    </div>
    </main>;
}

