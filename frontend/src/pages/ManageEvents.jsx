import { Link } from "react-router-dom";
import { eventApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";
export default function ManageEvents() {
    const events = eventApi.list().filter(e => e.ngoId === "ngo1");
    return <main className="section">
    <div className="container">
    <div className="page-heading row">
    <div>
    <span className="eyebrow">NGO EVENTS</span>
    <h1>Manage events</h1>
    </div>
    <Link className="btn btn-primary" to="/ngo/create-event">+ Create Event</Link>
    </div>
    <div className="table-wrap">
    <table>
    <thead>
    <tr>
    <th>Event</th>
    <th>Date</th>
    <th>Capacity</th>
    <th>Registered</th>
    <th>Readiness</th>
    <th>Status</th>
    <th>
    </th>
    </tr>
    </thead>
    <tbody>{events.map(e => <tr key={e.id}>
        <td>
        <strong>{e.title}</strong>
        </td>
        <td>{e.date}</td>
        <td>{e.capacity}</td>
        <td>{e.registered}</td>
        <td>{Math.round(e.registered / e.capacity * 100)}%</td>
        <td>
        <StatusBadge>{e.status}</StatusBadge>
        </td>
        <td>
        <Link className="text-link" to={`/ngo/events/${e.id}/registrations`}>Registrations</Link>
        </td>
        </tr>)}</tbody>
    </table>
    </div>
    </div>
    </main>;
}

