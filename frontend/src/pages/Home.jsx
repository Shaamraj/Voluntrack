import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, HeartHandshake, ShieldCheck, Clock3, Users, Leaf, HandHeart } from "lucide-react";
import EventCard from "../components/EventCard";
import { eventApi } from "../services/api";
export default function Home() {
    const events = eventApi.list().slice(0, 3);
    return <>
    <section className="hero">
    <div className="container hero-grid">
    <div>
    <span className="eyebrow">VOLUNTEER • CONNECT • IMPACT</span>
    <h1>Make an impact.<br />
    <span>Volunteer where it matters.</span>
    </h1>
    <p>Discover meaningful opportunities, connect with verified NGOs, and track every hour you contribute to your community.</p>
    <div className="hero-actions">
    <Link className="btn btn-primary" to="/events">Explore Events <ArrowRight size={18}/>
    </Link>
    <Link className="btn btn-light" to="/register">Join as Volunteer</Link>
    </div>
    <div className="hero-trust">
    <ShieldCheck /> Verified organizations · Transparent opportunities · Real impact</div>
    </div>
    <div className="hero-visual">
    <div className="hero-photo">
    <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80" alt="Volunteers"/>
    </div>
    <div className="impact-float">
    <HeartHandshake />
    <div>
    <strong>10,000+</strong>
    <small>hours served</small>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section className="stats">
    <div className="container stat-grid">{[["10K+", "Volunteer Hours"], ["250+", "Volunteers"], ["80+", "Events"], ["35+", "Verified NGOs"]].map(x => <div className="stat" key={x[1]}>
        <strong>{x[0]}</strong>
        <span>{x[1]}</span>
        </div>)}</div>
    </section>
    <section className="section">
    <div className="container">
    <div className="section-head">
    <div>
    <span className="eyebrow">OPPORTUNITIES</span>
    <h2>Find your next way to help</h2>
    </div>
    <Link className="text-link" to="/events">View all events <ArrowRight size={16}/>
    </Link>
    </div>
    <div className="event-grid">{events.map(e => <EventCard key={e.id} event={e}/>)}</div>
    </div>
    </section>
    <section className="section soft">
    <div className="container">
    <div className="section-head centered">
    <div>
    <span className="eyebrow">HOW IT WORKS</span>
    <h2>From interest to impact</h2>
    <p>Everything you need to find, join and track meaningful volunteering.</p>
    </div>
    </div>
    <div className="feature-grid">{[[CalendarCheck, "Discover", "Browse verified events that match your interests."], [Users, "Connect", "Register and reserve your place in a few clicks."], [Clock3, "Contribute", "Check in, check out and automatically track your hours."], [Leaf, "Grow Impact", "Build a record of your community contribution."]].map(([I, t, d], i) => <div className="feature" key={t}>
        <span className="feature-icon">
        <I />
        </span>
        <em>0{i + 1}</em>
        <h3>{t}</h3>
        <p>{d}</p>
        </div>)}</div>
    </div>
    </section>
    <section className="cta">
    <div className="container">
    <HandHeart size={40}/>
    <h2>Ready to make a difference?</h2>
    <p>There is always a community that needs your time and skills.</p>
    <Link className="btn btn-light" to="/register">Start Volunteering <ArrowRight size={17}/>
    </Link>
    </div>
    </section>
    </>;
}

