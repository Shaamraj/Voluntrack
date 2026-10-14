import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { UserCircle } from "lucide-react";
export default function VolunteerProfile() {
    const { user } = useAuth();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name || "");
    return <main className="section">
    <div className="container narrow">
    <div className="profile-card">
    <div className="profile-top">
    <div className="profile-avatar">
    <UserCircle size={45}/>
    </div>
    <div>
    <span className="eyebrow">VOLUNTEER PROFILE</span>
    <h1>{user.name}</h1>
    <p>{user.email}</p>
    </div>
    </div>{edit ? <>
        <label>Name<input value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <button className="btn btn-primary" onClick={() => { user.name = name; localStorage.setItem("voluntrack_user", JSON.stringify(user)); setEdit(false); }}>Save Changes</button>
        </> : <button className="btn btn-outline" onClick={() => setEdit(true)}>Edit Profile</button>}<hr />
    <h3>Skills</h3>
    <div className="skills">{(user.skills || ["Teamwork"]).map(s => <span key={s}>{s}</span>)}</div>
    <h3>Impact</h3>
    <div className="profile-stat">
    <strong>{user.hours || 18.5}</strong>
    <span>service hours</span>
    </div>
    </div>
    </div>
    </main>;
}

