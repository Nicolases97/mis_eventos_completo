import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function SearchEvent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await API.get(`/events${query ? `?q=${query}` : ""}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los eventos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        🔍 Buscar Eventos
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-6">
        <input
          type="text"
          placeholder="Escribe el nombre del evento..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:ring-2
          focus:ring-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
        >
          Buscar
        </button>
      </form>

      {loading && <p className="text-center">⏳ Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                {ev.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{ev.description}</p>
              <p className="text-sm text-gray-500 mb-1">📍 {ev.location}</p>
              <p className="text-sm text-gray-500">👥 Capacidad: {ev.capacity}</p>
              <Link
                to={`/events/${ev.id}`}
                className="mt-4 inline-block w-full text-center bg-indigo-600
                text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-500">
            No se encontraron eventos. Intenta otra búsqueda.
          </p>
        )
      )}
    </div>
  );
}
