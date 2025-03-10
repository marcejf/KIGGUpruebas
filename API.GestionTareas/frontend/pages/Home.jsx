import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Página de Inicio</h1>
      <button onClick={() => navigate("/tasks")}>Ir a Tareas</button>
    </div>
  );
}
