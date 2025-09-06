import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Close() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Limpiar storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Actualizar contexto
    dispatch({ type: "LOGOUT" });

    // 3. Redirigir a login
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-gray-600">Cerrando sesión...</p>
    </div>
  );
}
