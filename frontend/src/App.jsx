import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyRegistrations from "./pages/MyRegistrations.jsx";
import Close from "./pages/Close.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import SearchEvent from "./pages/SearchEvent.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-wide hover:text-indigo-200">
            🎉 Mis Eventos
          </Link>

          <div className="space-x-6">
            <Link
              to="/login"
              className="hover:text-indigo-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-200 transition-colors"
            >
              Registro
            </Link>
            <Link
              to="/events"
              className="hover:text-indigo-200 transition-colors"
            >
              Eventos
            </Link>
            <Link
              to="/profile"
              className="hover:text-indigo-200 transition-colors"
            >
              Inscripción
            </Link>
            <Link
              to="/my-registrations"
              className="hover:text-indigo-200 transition-colors"
            >
              Mis Eventos
            </Link>
            <Link
              to="/create-event"
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-lg"
            >
              Crear Evento
            </Link>
            <Link
              to="/close"
              className="hover:text-indigo-200 transition-colors"
            >
              Cerrar Sesion
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-registrations" element={<MyRegistrations />} />
          <Route path="/my-registrations:event_id" element={<MyRegistrations />} />
          <Route path="/close" element={<Close />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/search-event" element={<SearchEvent />} />
        </Routes>
      </main>
    </div>
  );
}
