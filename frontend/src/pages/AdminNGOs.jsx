import { useState } from "react";
import { ngoApplicationApi } from "../services/api";
export default function AdminNGOs() {
    const [items, setItems] = useState(ngoApplicationApi.list());
    const update = (id, status) => { ngoApplicationApi.update(id, status); setItems(ngoApplicationApi.list()); };
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">ADMIN</span>
    <h1>NGO verification</h1>
    <p>Review organizations before they can publish public events.</p>
    </div>{items.length ? <div className="admin-list">{items.map(x => <div className="application" key={x.id}>
            <div>
            <h3>{x.name}</h3>
            <p>{x.email} · Registration: {x.reg}</p>
            <span className={`status ${x.status.toLowerCase()}`}>{x.status}</span>
            </div>
            <div className="application-actions">
            <button className="btn btn-primary small" onClick={() => update(x.id, "APPROVED")}>Approve</button>
            <button className="btn btn-danger small" onClick={() => update(x.id, "REJECTED")}>Reject</button>
            </div>
            </div>)}</div> : <div className="empty">
        <h3>No pending applications</h3>
        <p>The verification queue is clear.</p>
        </div>}</div>
    </main>;
}

