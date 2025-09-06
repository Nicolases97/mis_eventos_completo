import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Eventos Disponibles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold">{ev.title}</h3>
            <p className="text-gray-600 text-sm">{ev.description}</p>
            <p className="text-sm mt-2 text-gray-500">📍 {ev.location}</p>
            <p className="text-sm mt-1 text-gray-500">Capacidad: {ev.capacity}</p>
            <Link
              to={`/events/${ev.id}`}
              className="mt-3 inline-block bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsList;
