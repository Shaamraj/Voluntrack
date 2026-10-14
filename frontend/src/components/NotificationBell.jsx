import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { notificationApi } from "../services/api";
export default function NotificationBell() {
    const unread = notificationApi.list().filter(n => !n.read).length;
    return <Link className="icon-btn" to="/notifications">
    <Bell size={19}/>{unread > 0 && <b>{unread}</b>}</Link>;
}

