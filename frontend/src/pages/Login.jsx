import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post(
      "/auth/login",
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = res.data.access_token;
    localStorage.setItem("token", token);

    alert("Login exitoso");
    navigate("/events");
  } catch (err) {
    console.error("Login error:", err);
    alert("Error en login");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          🔐 Iniciar sesión
        </h1>

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
          Ingresar
        </button>
      </form>
    </div>
  );
}
