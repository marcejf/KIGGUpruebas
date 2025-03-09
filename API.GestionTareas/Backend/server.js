import express from 'express'
import cors from 'cors';
import { initializeDB } from './data/database.js';
import tasksRouter from './routes/tasks.js';



const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

//inicializar la base de datos al conectar el servidor
initializeDB();

//las rutas de las tareas
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send('El servidor esta conectado 🚀');
});

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto : http://localhost:${PORT}`);
});