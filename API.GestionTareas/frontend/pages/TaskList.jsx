import { useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "./components/TaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/tasks", newTask);
      fetchTasks();
      setNewTask({ title: "", description: "", status: "To Do" });
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.log("Error al actualizar tarea:", error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestión de Tareas</h2>
      <form onSubmit={createTask} className="mb-3">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">Crear</button>
          </div>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(task)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <TaskModal
          task={selectedTask}
          closeModal={() => setShowModal(false)}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

export default TaskList;
