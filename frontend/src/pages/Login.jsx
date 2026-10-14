import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "volunteer@demo.com", password: "password123", role: "volunteer" });
    const [error, setError] = useState("");
    const submit = e => { e.preventDefault(); try {
        const u = login(form.email, form.password, form.role);
        nav(`/${u.role}/dashboard`);
    }
    catch (err) {
        setError(err.message);
    } };
    return <main className="auth-page">
    <div className="auth-card">
    <div className="auth-brand">V</div>
    <span className="eyebrow">WELCOME BACK</span>
    <h1>Sign in to VolunTrack</h1>
    <p>Continue your journey of community impact.</p>
    <form onSubmit={submit}>
    <label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
    </label>
    <label>Password<input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
    </label>
    <label>Role<select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
    <option value="volunteer">Volunteer</option>
    <option value="ngo">NGO</option>
    <option value="admin">Admin</option>
    </select>
    </label>{error && <div className="alert danger">{error}</div>}<button className="btn btn-primary full">Sign In</button>
    </form>
    <div className="demo-box">
    <strong>Demo accounts</strong>
    <small>Volunteer: volunteer@demo.com / password123</small>
    <small>NGO: ngo@demo.com / password123</small>
    <small>Admin: admin@demo.com / admin123</small>
    </div>
    <p className="auth-foot">New volunteer? <Link to="/register">Create an account</Link> · NGO? <Link to="/ngo-register">Apply here</Link>
    </p>
    </div>
    </main>;
}

