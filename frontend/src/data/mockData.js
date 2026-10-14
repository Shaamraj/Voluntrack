export const ngos = [
  { id: "ngo1", name: "Green Earth Foundation", location: "Chennai, Tamil Nadu", description: "A community-focused NGO working on environmental protection, clean-up drives and sustainable living initiatives.", verified: true },
  { id: "ngo2", name: "CareBridge Foundation", location: "Vellore, Tamil Nadu", description: "Supporting health, education and food distribution programs for underserved communities.", verified: true },
  { id: "ngo3", name: "Helping Hands Network", location: "Bengaluru, Karnataka", description: "Connecting volunteers with community development and social welfare activities.", verified: true }
];

export const initialEvents = [
  { id: "e1", ngoId: "ngo1", title: "Beach Cleanup Drive", category: "Environment", date: "12 Oct 2026", start: "9:00 AM", location: "Marina Beach, Chennai", description: "Join volunteers in cleaning the shoreline and spreading awareness about responsible waste management.", capacity: 50, registered: 32, skills: ["Teamwork", "Environment"], image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80", active: true },
  { id: "e2", ngoId: "ngo2", title: "Community Medical Camp", category: "Healthcare", date: "15 Oct 2026", start: "8:30 AM", location: "Vellore Community Hall", description: "Support a free community medical camp with registration, crowd management and basic assistance.", capacity: 40, registered: 24, skills: ["First Aid", "Registration", "Teamwork"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", active: true },
  { id: "e3", ngoId: "ngo1", title: "Food Distribution Drive", category: "Community", date: "18 Oct 2026", start: "10:00 AM", location: "T. Nagar, Chennai", description: "Help prepare and distribute food packages to families in the local community.", capacity: 60, registered: 41, skills: ["Food Handling", "Teamwork", "Crowd Management"], image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80", active: true },
  { id: "e4", ngoId: "ngo3", title: "School Support Workshop", category: "Education", date: "22 Oct 2026", start: "9:30 AM", location: "Bengaluru Government School", description: "Assist students through learning activities, mentoring and educational support sessions.", capacity: 30, registered: 17, skills: ["Teaching", "Communication", "Teamwork"], image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80", active: true },
  { id: "e5", ngoId: "ngo2", title: "Community Garden Project", category: "Environment", date: "26 Oct 2026", start: "7:30 AM", location: "Katpadi, Vellore", description: "Help create and maintain a community garden while learning practical sustainable gardening methods.", capacity: 35, registered: 12, skills: ["Gardening", "Environment", "Teamwork"], image: "https://images.unsplash.com/photo-1599685315640-4f8f6b0b6d1f?auto=format&fit=crop&w=1000&q=80", active: true },
  { id: "e6", ngoId: "ngo1", title: "Community Awareness Campaign", category: "Awareness", date: "30 Oct 2026", start: "4:00 PM", location: "Adyar, Chennai", description: "Support a public awareness campaign focused on sustainable community practices.", capacity: 45, registered: 19, skills: ["Communication", "Public Speaking", "Teamwork"], image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80", active: true }
];

export function seedState() {
  if (!localStorage.getItem("voluntrack_events")) localStorage.setItem("voluntrack_events", JSON.stringify(initialEvents));
  if (!localStorage.getItem("voluntrack_registrations")) localStorage.setItem("voluntrack_registrations", JSON.stringify([
    { id: "r1", eventId: "e1", volunteerId: "v1", status: "Confirmed" },
    { id: "r2", eventId: "e2", volunteerId: "v1", status: "Confirmed" }
  ]));
  if (!localStorage.getItem("voluntrack_notifications")) localStorage.setItem("voluntrack_notifications", JSON.stringify([
    { id: "n1", title: "Registration confirmed", message: "Your registration for Beach Cleanup Drive is confirmed.", read: false },
    { id: "n2", title: "Upcoming event", message: "Community Medical Camp is coming up soon.", read: false }
  ]));
}
