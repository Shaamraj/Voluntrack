import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { ngoApi } from "../services/api";
export default function NGOs() {
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">TRUSTED PARTNERS</span>
    <h1>Verified NGOs</h1>
    <p>Meet organizations creating meaningful opportunities in our communities.</p>
    </div>
    <div className="ngo-grid">{ngoApi.list().map(n => <article className="ngo-card" key={n.id}>
        <div className="ngo-avatar">{n.name.split(" ").map(x => x[0]).slice(0, 2).join("")}</div>
        <div className="verified">
        <CheckCircle2 size={15}/> Verified</div>
        <h3>{n.name}</h3>
        <span>
        <MapPin size={15}/> {n.location}</span>
        <p>{n.description}</p>
        <div className="skills">{n.causes.map(c => <span key={c}>{c}</span>)}</div>
        <Link className="text-link" to={`/ngos/${n.id}`}>View profile <ArrowRight size={15}/>
        </Link>
        </article>)}</div>
    </div>
    </main>;
}

