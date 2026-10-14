import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();
    const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", phone: "", location: "", bio: "", skills: ["Teamwork"] });
    const [err, setErr] = useState("");
    const skills = ["Teamwork", "First Aid", "Teaching", "Communication", "Environmental Awareness", "Crowd Management", "Registration Desk", "Animal Care"];
    const submit = e => { e.preventDefault(); if (f.password !== f.confirm)
        return setErr("Passwords do not match."); try {
        register(f);
        nav("/login");
    }
    catch (x) {
        setErr(x.message);
    } };
    const toggle = s => setF({ ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s] });
    return <main className="auth-page">
    <div className="auth-card wide">
    <span className="eyebrow">JOIN THE COMMUNITY</span>
    <h1>Create your volunteer profile</h1>
    <p>Tell us a little about yourself so you can find better opportunities.</p>
    <form onSubmit={submit}>
    <div className="form-grid">
    <label>Full Name<input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })}/>
    </label>
    <label>Email<input required type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })}/>
    </label>
    <label>Password<input required type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })}/>
    </label>
    <label>Confirm Password<input required type="password" value={f.confirm} onChange={e => setF({ ...f, confirm: e.target.value })}/>
    </label>
    <label>Phone<input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })}/>
    </label>
    <label>Location<input value={f.location} onChange={e => setF({ ...f, location: e.target.value })}/>
    </label>
    </div>
    <label>Bio<textarea value={f.bio} onChange={e => setF({ ...f, bio: e.target.value })}/>
    </label>
    <h3>Skills</h3>
    <div className="check-grid">{skills.map(s => <button type="button" className={`check-chip ${f.skills.includes(s) ? "selected" : ""}`} key={s} onClick={() => toggle(s)}>✓ {s}</button>)}</div>{err && <div className="alert danger">{err}</div>}<button className="btn btn-primary full">Create Volunteer Account</button>
    </form>
    <p className="auth-foot">Already registered? <Link to="/login">Sign in</Link>
    </p>
    </div>
    </main>;
}

