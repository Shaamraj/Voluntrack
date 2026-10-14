import { eventApi } from "../services/api";
export default function AdminEvents() {
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">ADMIN</span>
    <h1>All events</h1>
    <p>Platform-wide event monitoring.</p>
    </div>
    <div className="table-wrap">
    <table>
    <thead>
    <tr>
    <th>Event</th>
    <th>Category</th>
    <th>Date</th>
    <th>Capacity</th>
    <th>Registered</th>
    <th>Status</th>
    </tr>
    </thead>
    <tbody>{eventApi.list().map(e => <tr key={e.id}>
        <td>
        <strong>{e.title}</strong>
        </td>
        <td>{e.category}</td>
        <td>{e.date}</td>
        <td>{e.capacity}</td>
        <td>{e.registered}</td>
        <td>
        <span className="status confirmed">{e.status}</span>
        </td>
        </tr>)}</tbody>
    </table>
    </div>
    </div>
    </main>;
}

