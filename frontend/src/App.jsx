import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import NGOs from "./pages/NGOs";
import NGOProfile from "./pages/NGOProfile";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NGORegister from "./pages/NGORegister";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerProfile from "./pages/VolunteerProfile";
import VolunteerHistory from "./pages/VolunteerHistory";
import Notifications from "./pages/Notifications";
import NGODashboard from "./pages/NGODashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import EventRegistrations from "./pages/EventRegistrations";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNGOs from "./pages/AdminNGOs";
import AdminEvents from "./pages/AdminEvents";
import NotFound from "./pages/NotFound";
export default function App() {
    return <>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/events" element={<Events />}/>
    <Route path="/events/:id" element={<EventDetails />}/>
    <Route path="/ngos" element={<NGOs />}/>
    <Route path="/ngos/:id" element={<NGOProfile />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/ngo-register" element={<NGORegister />}/>
    <Route element={<ProtectedRoute roles={["volunteer"]}/>}>
    <Route path="/volunteer/dashboard" element={<VolunteerDashboard />}/>
    <Route path="/volunteer/profile" element={<VolunteerProfile />}/>
    <Route path="/volunteer/history" element={<VolunteerHistory />}/>
    </Route>
    <Route element={<ProtectedRoute roles={["volunteer", "ngo", "admin"]}/>}>
    <Route path="/notifications" element={<Notifications />}/>
    </Route>
    <Route element={<ProtectedRoute roles={["ngo"]}/>}>
    <Route path="/ngo/dashboard" element={<NGODashboard />}/>
    <Route path="/ngo/create-event" element={<CreateEvent />}/>
    <Route path="/ngo/events" element={<ManageEvents />}/>
    <Route path="/ngo/events/:id/registrations" element={<EventRegistrations />}/>
    </Route>
    <Route element={<ProtectedRoute roles={["admin"]}/>}>
    <Route path="/admin/dashboard" element={<AdminDashboard />}/>
    <Route path="/admin/ngos" element={<AdminNGOs />}/>
    <Route path="/admin/events" element={<AdminEvents />}/>
    </Route>
    <Route path="*" element={<NotFound />}/>
    </Routes>
    <Footer />
    </>;
}

