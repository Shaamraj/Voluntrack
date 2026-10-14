import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { notificationApi } from "../services/api";
export default function Notifications() {
    const [items, setItems] = useState(notificationApi.list());
    const refresh = () => setItems(notificationApi.list());
    return <main className="section">
    <div className="container narrow">
    <div className="page-heading row">
    <div>
    <span className="eyebrow">UPDATES</span>
    <h1>Notifications</h1>
    </div>
    <button className="btn btn-outline" onClick={() => { notificationApi.markAll(); refresh(); }}>Mark all as read</button>
    </div>
    <div className="notification-list">{items.map(n => <div className={`notification ${n.read ? "read" : ""}`} key={n.id}>
        <span className="notification-icon">
        <Bell size={18}/>
        </span>
        <div>
        <strong>{n.title}</strong>
        <p>{n.text}</p>
        <small>{n.date}</small>
        </div>{!n.read && <button onClick={() => { notificationApi.markRead(n.id); refresh(); }}>
            <Check size={17}/>
            </button>}</div>)}</div>
    </div>
    </main>;
}

