import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, LogOut, UserCircle, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
export default function Navbar() {
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const [open, setOpen] = useState(false);
    const dashboard = user ? `/${user.role}/dashboard` : "/login";
    const links = [["Home", "/"], ["Events", "/events"], ["NGOs", "/ngos"], ["About", "/about"]];
    return <header className="navbar">
    <div className="container nav-inner">
    <Link className="brand" to="/" onClick={() => setOpen(false)}>
    <span className="brand-mark">V</span>Volun<span>Track</span>
    </Link>
    <button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={`nav-links ${open ? "open" : ""}`}>
      {links.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
      {user ? <>
        <NavLink to={dashboard} onClick={() => setOpen(false)}>Dashboard</NavLink>
        <NavLink to="/notifications" onClick={() => setOpen(false)}>
        <Bell size={16}/> Notifications</NavLink>
        <button className="nav-profile" onClick={() => { nav(user.role === "volunteer" ? "/volunteer/profile" : dashboard); setOpen(false); }}>
        <UserCircle size={18}/>{user.name}</button>
        <button className="btn btn-outline small" onClick={() => { logout(); nav("/"); setOpen(false); }}>
        <LogOut size={15}/> Logout</button>
      </> : <>
        <Link className="btn btn-outline small" to="/login">Login</Link>
        <Link className="btn btn-primary small" to="/register">Join as Volunteer</Link>
        </>}
    </nav>
  </div>
    </header>;
}

