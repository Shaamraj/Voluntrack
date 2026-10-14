import { useAuth } from "../context/AuthContext";
import { eventApi, registrationApi } from "../services/api";
export default function VolunteerHistory() {
    const { user } = useAuth();
    const regs = registrationApi.list().filter(r => r.volunteerId === user.id);
    return <main className="section">
    <div className="container">
    <div className="page-heading">
    <span className="eyebrow">YOUR IMPACT</span>
    <h1>Volunteer history</h1>
    <p>Every event you complete contributes to your impact record.</p>
    </div>
    <div className="history-total">
    <strong>{user.hours || 18.5}</strong>
    <span>Total service hours</span>
    </div>
    <div className="table-wrap">
    <table>
    <thead>
    <tr>
    <th>Event</th>
    <th>Date</th>
    <th>Status</th>
    <th>Check-in</th>
    <th>Check-out</th>
    <th>Hours</th>
    </tr>
    </thead>
    <tbody>{regs.map(r => {
            const e = eventApi.get(r.eventId);
            return <tr key={r.id}>
            <td>{e?.title}</td>
            <td>{e?.date}</td>
            <td>
            <span className="status confirmed">Confirmed</span>
            </td>
            <td>09:02 AM</td>
            <td>12:14 PM</td>
            <td>3.2 hrs</td>
            </tr>;
        })}</tbody>
    </table>
    </div>
    </div>
    </main>;
}

