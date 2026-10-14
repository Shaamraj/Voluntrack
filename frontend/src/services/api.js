import { initialEvents, ngos, seedState } from "../data/mockData";
seedState();
const read = key => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const eventApi = {
    list: () => read("voluntrack_events").length ? read("voluntrack_events") : initialEvents,
    get: id => eventApi.list().find(e => e.id === id),
    create: event => {
        const next = { ...event, id: `e${Date.now()}` };
        write("voluntrack_events", [...eventApi.list(), next]);
        return next;
    },
    update: (id, data) => {
        const next = eventApi.list().map(e => e.id === id ? { ...e, ...data } : e);
        write("voluntrack_events", next);
        return next.find(e => e.id === id);
    },
    remove: id => write("voluntrack_events", eventApi.list().filter(e => e.id !== id))
};
export const ngoApi = {
    list: () => ngos,
    get: id => ngos.find(n => n.id === id)
};
export const registrationApi = {
    list: () => read("voluntrack_registrations"),
    register: (eventId, volunteerId) => {
        const list = registrationApi.list();
        if (list.some(r => r.eventId === eventId && r.volunteerId === volunteerId))
            throw new Error("You are already registered for this event.");
        const event = eventApi.get(eventId);
        if (!event || event.registered >= event.capacity)
            throw new Error("This event is full.");
        const registration = { id: `r${Date.now()}`, eventId, volunteerId, status: "Confirmed" };
        write("voluntrack_registrations", [...list, registration]);
        eventApi.update(eventId, { registered: event.registered + 1 });
        return registration;
    },
    cancel: (eventId, volunteerId) => {
        const list = registrationApi.list().filter(r => !(r.eventId === eventId && r.volunteerId === volunteerId));
        write("voluntrack_registrations", list);
        const event = eventApi.get(eventId);
        if (event)
            eventApi.update(eventId, { registered: Math.max(0, event.registered - 1) });
    }
};
export const notificationApi = {
    list: () => read("voluntrack_notifications"),
    markRead: id => { const n = notificationApi.list().map(x => x.id === id ? { ...x, read: true } : x); write("voluntrack_notifications", n); },
    markAll: () => write("voluntrack_notifications", notificationApi.list().map(x => ({ ...x, read: true })))
};
export const ngoApplicationApi = {
    submit: data => {
        const all = read("voluntrack_ngo_applications");
        const item = { ...data, id: `app${Date.now()}`, status: "PENDING", date: new Date().toISOString() };
        write("voluntrack_ngo_applications", [...all, item]);
        return item;
    },
    list: () => read("voluntrack_ngo_applications"),
    update: (id, status) => { const all = ngoApplicationApi.list().map(x => x.id === id ? { ...x, status } : x); write("voluntrack_ngo_applications", all); }
};
export const fundingData = [
    { id: "f1", sponsor: "TechCorp", event: "Community Medical Camp", amount: 50000, date: "2026-10-10", status: "Confirmed" },
    { id: "f2", sponsor: "GreenWorks", event: "Beach Cleanup Drive", amount: 35000, date: "2026-10-11", status: "Confirmed" },
    { id: "f3", sponsor: "CareFirst", event: "Food Distribution Drive", amount: 25000, date: "2026-10-12", status: "Pending" }
];

