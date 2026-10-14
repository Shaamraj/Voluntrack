export default function StatusBadge({ children, type = "" }) { return <span className={`status ${type || String(children).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>; }

