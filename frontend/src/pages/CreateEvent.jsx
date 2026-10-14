import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventApi } from "../services/api";
export default function CreateEvent() {
    const nav = useNavigate();
    const [f, setF] = useState({ title: "", category: "Environment", description: "", date: "", start: "09:00", end: "12:00", location: "", capacity: 50, csrReserved: 0, skills: ["Teamwork"], image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80" });
    const [skill, setSkill] = useState("");
    const set = (k, v) => setF({ ...f, [k]: v });
    const addSkill = () => { if (skill && !f.skills.includes(skill))
        setF({ ...f, skills: [...f.skills, skill] }); setSkill(""); };
    const submit = e => { e.preventDefault(); eventApi.create({ ...f, ngoId: "ngo1", registered: 0, status: "Published" }); nav("/ngo/events"); };
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">EVENT MANAGEMENT</span>
    <h1>Create an event</h1>
    <p>Build a clear, engaging opportunity for volunteers.</p>
    </div>
    <div className="form-layout">
    <form className="panel form-panel" onSubmit={submit}>
    <label>Event Title<input required value={f.title} onChange={e => set("title", e.target.value)}/>
    </label>
    <label>Category<select value={f.category} onChange={e => set("category", e.target.value)}>{["Environment", "Health", "Education", "Community", "Animals"].map(x => <option key={x}>{x}</option>)}</select>
    </label>
    <label>Description<textarea required value={f.description} onChange={e => set("description", e.target.value)}/>
    </label>
    <div className="form-grid">
    <label>Date<input required type="date" value={f.date} onChange={e => set("date", e.target.value)}/>
    </label>
    <label>Location<input required value={f.location} onChange={e => set("location", e.target.value)}/>
    </label>
    <label>Start Time<input type="time" value={f.start} onChange={e => set("start", e.target.value)}/>
    </label>
    <label>End Time<input type="time" value={f.end} onChange={e => set("end", e.target.value)}/>
    </label>
    <label>Capacity<input type="number" min="1" value={f.capacity} onChange={e => set("capacity", +e.target.value)}/>
    </label>
    <label>CSR Reserved Slots<input type="number" min="0" value={f.csrReserved} onChange={e => set("csrReserved", +e.target.value)}/>
    </label>
    </div>
    <label>Cover Image URL<input value={f.image} onChange={e => set("image", e.target.value)}/>
    </label>
    <h3>Required Skills</h3>
    <div className="skill-input">
    <input value={skill} onChange={e => setSkill(e.target.value)} placeholder="e.g. First Aid"/>
    <button type="button" className="btn btn-outline" onClick={addSkill}>Add</button>
    </div>
    <div className="skills">{f.skills.map(s => <span key={s}>{s} <button type="button" onClick={() => setF({ ...f, skills: f.skills.filter(x => x !== s) })}>×</button>
        </span>)}</div>
    <button className="btn btn-primary full">Publish Event</button>
    </form>
    <aside className="preview panel">
    <span className="eyebrow">LIVE PREVIEW</span>
    <h3>{f.title || "Your event title"}</h3>
    <img src={f.image} alt="preview"/>
    <p>{f.description || "Your event description will appear here."}</p>
    <div className="mini-list">
    <span>📅 {f.date || "Select a date"} · {f.start}</span>
    <span>📍 {f.location || "Add location"}</span>
    <span>👥 {f.capacity} capacity</span>
    </div>
    </aside>
    </div>
    </div>
    </main>;
}

