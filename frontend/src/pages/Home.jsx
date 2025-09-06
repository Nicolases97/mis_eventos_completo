import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          🎉 Eventos disponibles
        </h1>
        <button
          onClick={() => navigate("/create-event")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
        >
          ➕ Crear Evento
        </button>
        <button
          onClick={() => navigate("/search-event")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
        >
            🔍 Buscar
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos disponibles.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {ev.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{ev.description}</p>
              <p className="text-sm text-gray-500 mb-1">📍 {ev.location}</p>
              <p className="text-sm text-gray-500">👥 Capacidad: {ev.capacity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
