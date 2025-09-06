import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
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

  const statusBadge = (status) => {
    const base =
      "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full";
    switch ((status || "").toLowerCase()) {
      case "published":
      case "publicado":
        return `${base} bg-green-100 text-green-700 ring-1 ring-green-200`;
      case "draft":
      case "borrador":
        return `${base} bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200`;
      case "cancelled":
      case "canceled":
      case "cancelado":
        return `${base} bg-red-100 text-red-700 ring-1 ring-red-200`;
      default:
        return `${base} bg-gray-100 text-gray-700 ring-1 ring-gray-200`;
    }
  };

  useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      const res = await API.get(`/event/my-registrations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setEvent(res.data); // 👈 ya no es array
    } catch (e) {
      setError("No se pudo cargar el evento.");
    } finally {
      setLoading(false);
    }
  })();
  }, [id]);

  const handleRegister = async () => {
    try {
      setRegistering(true);

      const token = localStorage.getItem("token");

      await API.post(
        `/event/${id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("¡Te registraste exitosamente en este evento! 🎉");
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        "No se pudo realizar el registro. Intenta nuevamente.";
      alert(msg);
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async (id) => {
  if (!window.confirm("¿Seguro que deseas eliminar este evento?")) return;

  try {
    setRegistering(true);
    const token = localStorage.getItem("token");
    await API.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Evento eliminado correctamente ✅");
  } catch (err) {
    console.error(err);
    alert("Error al eliminar el evento ❌");
  } finally {
    setRegistering(false);
  }
};


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

  if (error || !event) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg ring-1 ring-red-100">
          {error || "Evento no encontrado."}
        </div>
        <Link
          to="/profile"
          className="inline-block mt-6 text-indigo-600 hover:text-indigo-500"
        >
          ← Volver
        </Link>
      </div>
    );
  }

  const isPublished =
    (event.status || "").toLowerCase() === "published" ||
    (event.status || "").toLowerCase() === "publicado";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          <span>←</span> Volver
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
            <span className={statusBadge(event.status)}>
              {event.status ?? "—"}
            </span>
          </div>
          {event.location && (
            <p className="mt-2 opacity-90">📍 {event.location}</p>
          )}
        </div>

        <div className="p-8">

          {event.description && (
            <p className="text-gray-700 leading-relaxed mb-6">
              {event.description}
            </p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
              <p className="text-xs text-gray-500">Inicio</p>
              <p className="font-semibold text-gray-800">
                {formatDate(event.start_date)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
              <p className="text-xs text-gray-500">Fin</p>
              <p className="font-semibold text-gray-800">
                {formatDate(event.end_date)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
              <p className="text-xs text-gray-500">Capacidad</p>
              <p className="font-semibold text-gray-800">
                {event.capacity}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-100">
              <p className="text-xs text-gray-500">Ubicación</p>
              <p className="font-semibold text-gray-800">
                {event.location}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Sesiones
            </h2>
            {Array.isArray(event.sessions) && event.sessions.length > 0 ? (
              <ul className="space-y-3">
                {event.sessions.map((s) => (
                  <li
                    key={s.id || s.title}
                    className="flex items-start justify-between gap-4 bg-white rounded-xl p-4 ring-1 ring-gray-100 hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{s.title}</p>
                      {s.speaker && (
                        <p className="text-sm text-gray-500">
                          Ponente: {s.speaker}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      <div>{formatDate(s.start_time)}</div>
                      <div className="text-gray-400">→</div>
                      <div>{formatDate(s.end_time)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Aún no hay sesiones publicadas para este evento.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              * Debes estar autenticado para registrarte.
            </p><button
              onClick={() => handleDelete(event.id)}
              disabled={registering}
              className={`inline-flex items-center justify-center px-5 py-3 rounded-lg text-white font-medium transition ${
                !registering
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              title={!registering ? "Eliminar evento" : "Eliminando..."}
            >
              {registering ? "Eliminando..." : "🗑️ Eliminar Evento"}
            </button>
            <button
              onClick={handleRegister}
              disabled={!isPublished || registering}
              className={`inline-flex items-center justify-center px-5 py-3 rounded-lg text-white font-medium transition ${
                isPublished
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              title={
                isPublished
                  ? "Registrar asistencia"
                  : "Este evento no está publicado"
              }
            >
              {registering ? "Registrando..." : "Registrarme en este evento"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
