import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Profile() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Debes iniciar sesión para ver tus registros.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(res.data);
      } catch (e) {
        setError("No se pudieron cargar tus eventos registrados.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg ring-1 ring-red-100">
          {error}
        </div>
        <Link
          to="/login"
          className="inline-block mt-6 text-indigo-600 hover:text-indigo-500"
        >
          → Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        🎟️ Incripción de Eventos
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No te has registrado en ningún evento.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                {ev.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{ev.description}</p>
              <p className="text-sm text-gray-500">📍 {ev.location}</p>
              <p className="text-sm text-gray-500">📅 {ev.start_date}</p>
              <Link
                to={`/events/${ev.id}`}
                className="mt-4 inline-block w-full text-center bg-indigo-600 text-white px-4 py-2
                rounded-lg hover:bg-indigo-500 transition"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
