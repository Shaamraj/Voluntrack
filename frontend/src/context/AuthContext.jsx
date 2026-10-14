import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
const demoUsers = [
    { id: "v1", name: "Arun Kumar", email: "volunteer@demo.com", password: "password123", role: "volunteer", skills: ["Teamwork", "First Aid"], hours: 18.5 },
    { id: "n1", name: "Green Earth Foundation", email: "ngo@demo.com", password: "password123", role: "ngo", verified: true },
    { id: "a1", name: "VolunTrack Admin", email: "admin@demo.com", password: "admin123", role: "admin" }
];
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("voluntrack_user")) || null;
        }
        catch {
            return null;
        }
    });
    useEffect(() => {
        if (user)
            localStorage.setItem("voluntrack_user", JSON.stringify(user));
        else
            localStorage.removeItem("voluntrack_user");
    }, [user]);
    function login(email, password, role) {
        const users = JSON.parse(localStorage.getItem("voluntrack_users") || "[]");
        const all = [...demoUsers, ...users];
        const found = all.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role);
        if (!found)
            throw new Error("Invalid email, password, or role.");
        const safe = { ...found };
        delete safe.password;
        setUser(safe);
        return safe;
    }
    function register(data) {
        const users = JSON.parse(localStorage.getItem("voluntrack_users") || "[]");
        if ([...demoUsers, ...users].some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
            throw new Error("An account with this email already exists.");
        }
        const newUser = { id: `v${Date.now()}`, role: "volunteer", hours: 0, ...data };
        localStorage.setItem("voluntrack_users", JSON.stringify([...users, newUser]));
        return newUser;
    }
    function logout() { setUser(null); }
    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

