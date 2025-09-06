import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        email,
        password,
        full_name: fullName,
      });
      alert("✅ Usuario registrado, ahora haz login");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Error en registro");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          📝 Crear cuenta
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nombre completo</label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="usuario@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Registrarme
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
}
