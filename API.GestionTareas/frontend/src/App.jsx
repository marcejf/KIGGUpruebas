import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx"; // Asegúrate de que está en la carpeta correcta
import TaskList from "../pages/TaskList.jsx";
import TaskForm from "../pages/TaskForm.jsx";
import NotFound from "../pages/NotFound.jsx";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="*" element={<NotFound />} /> {/* Captura rutas no existentes */}
      </Routes>
    </div>
  );
}

export default App;
