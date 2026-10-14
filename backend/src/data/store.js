import bcrypt from "bcryptjs";

const passwordHash = (password) => bcrypt.hashSync(password, 10);

export const store = {
  users: [
    { id: "v1", name: "Arun Kumar", email: "volunteer@demo.com", passwordHash: passwordHash("password123"), role: "volunteer", skills: ["Teamwork", "First Aid"], hours: 18.5 },
    { id: "n1", name: "Green Earth Foundation", email: "ngo@demo.com", passwordHash: passwordHash("password123"), role: "ngo", ngoId: "ngo1", verified: true },
    { id: "a1", name: "VolunTrack Admin", email: "admin@demo.com", passwordHash: passwordHash("admin123"), role: "admin" }
  ],
  ngos: [
    { id: "ngo1", name: "Green Earth Foundation", location: "Chennai, Tamil Nadu", description: "A community-focused NGO working on environmental protection, clean-up drives and sustainable living initiatives.", verified: true, ownerUserId: "n1" },
    { id: "ngo2", name: "CareBridge Foundation", location: "Vellore, Tamil Nadu", description: "Supporting health, education and food distribution programs for underserved communities.", verified: true },
    { id: "ngo3", name: "Helping Hands Network", location: "Bengaluru, Karnataka", description: "Connecting volunteers with community development and social welfare activities.", verified: true }
  ],
  events: [
    { id: "e1", ngoId: "ngo1", title: "Beach Cleanup Drive", category: "Environment", date: "2026-10-20", start: "09:00", location: "Marina Beach, Chennai", description: "Join volunteers in cleaning the shoreline and spreading awareness about responsible waste management.", capacity: 50, registered: 1, skills: ["Teamwork", "Environment"], image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80", active: true, csrReservedSlots: 0 },
    { id: "e2", ngoId: "ngo2", title: "Community Medical Camp", category: "Healthcare", date: "2026-10-22", start: "08:30", location: "Vellore Community Hall", description: "Support a free community medical camp with registration, crowd management and basic assistance.", capacity: 40, registered: 0, skills: ["First Aid", "Registration", "Teamwork"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", active: true, csrReservedSlots: 5 },
    { id: "e3", ngoId: "ngo1", title: "Food Distribution Drive", category: "Community", date: "2026-10-25", start: "10:00", location: "T. Nagar, Chennai", description: "Help prepare and distribute food packages to families in the local community.", capacity: 60, registered: 0, skills: ["Food Handling", "Teamwork", "Crowd Management"], image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80", active: true, csrReservedSlots: 0 }
  ],
  registrations: [
    { id: "r1", eventId: "e1", volunteerId: "v1", status: "Confirmed", createdAt: new Date().toISOString(), checkInTime: null, checkOutTime: null, hoursServed: 0 }
  ],
  ngoApplications: [],
  funding: [
    { id: "f1", ngoId: "ngo1", eventId: "e1", sponsor: "TechCorp", amount: 50000, date: "2026-10-10", status: "Confirmed" },
    { id: "f2", ngoId: "ngo2", eventId: "e2", sponsor: "CareFirst", amount: 25000, date: "2026-10-12", status: "Pending" }
  ],
  notifications: [
    { id: "n1", userId: "v1", title: "Registration confirmed", message: "Your registration for Beach Cleanup Drive is confirmed.", read: false, createdAt: new Date().toISOString() }
  ]
};

export function nextId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

export function addNotification(userId, title, message) {
  store.notifications.unshift({ id: nextId("ntf"), userId, title, message, read: false, createdAt: new Date().toISOString() });
}
