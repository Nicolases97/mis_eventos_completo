import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("es-CO", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    []
  );

  const formatDate = (iso) => (iso ? fmt.format(new Date(iso)) : "-");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await API.get(`/event/my-registrations`);
        if (!ignore) setEvents(res.data);
      } catch (e) {
        setError("No se pudieron cargar tus registros.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="text-center py-10">⏳ Cargando eventos...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p>{error}</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Volver
        </Link>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tienes registros en eventos.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Ver eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">🎫 Mis Eventos Inscritos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 text-white">
              <h2 className="text-lg font-bold">{event.title}</h2>
              <p className="text-sm opacity-80">📍 {event.location}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-2">{event.description}</p>
              <div className="text-sm text-gray-500">
                <p>Inicio: {formatDate(event.start_date)}</p>
                <p>Fin: {formatDate(event.end_date)}</p>
                <p>Capacidad: {event.capacity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
