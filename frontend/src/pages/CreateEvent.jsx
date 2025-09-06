import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: 0,
    status: "draft",
    start_date: "",
    end_date: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await API.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Evento creado con éxito");
      navigate("/create-event");
    } catch (err) {
      console.error(err)
      alert("Usuario no autorizado para crear evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        📝 Crear nuevo evento
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacidad"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </select>
        <label className="block">
          Inicio:
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </label>
        <label className="block">
          Fin:
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          {loading ? "Creando..." : "Crear Evento"}
        </button>
      </form>
    </div>
  );
}
