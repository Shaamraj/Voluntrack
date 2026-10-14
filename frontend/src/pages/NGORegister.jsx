import { useState } from "react";
import { ngoApplicationApi } from "../services/api";
export default function NGORegister() {
    const [submitted, setSubmitted] = useState(false);
    const [f, setF] = useState({ name: "", reg: "", darpan: "", pan: "", email: "", phone: "", address: "", rep: "", description: "", causes: "" });
    const submit = e => { e.preventDefault(); ngoApplicationApi.submit(f); setSubmitted(true); };
    if (submitted)
        return <main className="auth-page">
        <div className="auth-card">
        <div className="success-icon">✓</div>
        <span className="eyebrow">APPLICATION RECEIVED</span>
        <h1>Verification is pending</h1>
        <p>Your NGO application has been submitted. An administrator will review the details before your organization can publish public events.</p>
        <div className="status pending">PENDING VERIFICATION</div>
        </div>
        </main>;
    return <main className="auth-page">
    <div className="auth-card wide">
    <span className="eyebrow">FOR ORGANIZATIONS</span>
    <h1>Register your NGO</h1>
    <p>Apply to become a verified VolunTrack organization.</p>
    <form onSubmit={submit}>
    <div className="form-grid">
    <label>NGO Name<input required value={f.name} onChange={e => setF({ ...f, name: e.target.value })}/>
    </label>
    <label>Registration Number<input required value={f.reg} onChange={e => setF({ ...f, reg: e.target.value })}/>
    </label>
    <label>NGO Darpan ID<input value={f.darpan} onChange={e => setF({ ...f, darpan: e.target.value })}/>
    </label>
    <label>PAN<input value={f.pan} onChange={e => setF({ ...f, pan: e.target.value })}/>
    </label>
    <label>Official Email<input required type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })}/>
    </label>
    <label>Phone<input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })}/>
    </label>
    </div>
    <label>Address<textarea value={f.address} onChange={e => setF({ ...f, address: e.target.value })}/>
    </label>
    <label>Authorized Representative<input value={f.rep} onChange={e => setF({ ...f, rep: e.target.value })}/>
    </label>
    <label>About the NGO<textarea value={f.description} onChange={e => setF({ ...f, description: e.target.value })}/>
    </label>
    <label>Causes<input placeholder="Health, Education, Environment..." value={f.causes} onChange={e => setF({ ...f, causes: e.target.value })}/>
    </label>
    <label>Registration Certificate<div className="upload-box">Click to simulate document upload</div>
    </label>
    <button className="btn btn-primary full">Submit for Verification</button>
    </form>
    </div>
    </main>;
}

