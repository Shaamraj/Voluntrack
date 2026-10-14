import { useParams } from "react-router-dom";
import { eventApi, registrationApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function EventRegistrations() {
    const { id } = useParams();
    const e = eventApi.get(id);
    const regs = registrationApi.list().filter(r => r.eventId === id);
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">EVENT REGISTRATIONS</span>
    <h1>{e?.title}</h1>
    <p>{regs.length} registered volunteers.</p>
    </div>
    <div className="table-wrap">
    <table>
    <thead>
    <tr>
    <th>Volunteer</th>
    <th>Skills</th>
    <th>Registration</th>
    <th>Status</th>
    <th>Attendance</th>
    </tr>
    </thead>
    <tbody>{regs.map(r => <tr key={r.id}>
        <td>Arun Kumar</td>
        <td>Teamwork · First Aid</td>
        <td>Confirmed</td>
        <td>
        <span className="status confirmed">{r.status}</span>
        </td>
        <td>Not checked in</td>
        </tr>)}</tbody>
    </table>
    </div>
    </div>
    </main>;
}

