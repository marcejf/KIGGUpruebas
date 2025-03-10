import { connectDB } from "../data/database.js";
import { Router } from "express";

const router = Router();

//obtener todas las tareas 

router.get('/', async (req, res) => {
    try {
        const db = await  connectDB();
        const tasks = await db.all('SELECT * FROM tasks');
        res.json(tasks);
    }catch(error) {
        res.status(500).json({error:'Error al obtener tareas'});
    }
});

//creara una tareas nueva

router.post('/', async (req, res) => {
    try {
        const { title, description, status = "to do"} = req.body;

        if (!title ) {
            return res.status(400).json({error: 'El titulo es obligatorio '});
        }

        const db = await connectDB();
        const result = await db.run(
            'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
            [title, description, status]
        );

        res.status(201).json({id: result.lastID, title, description, status});
    }catch(error) {
        console.error("2 error",error);
        res.status(500).json({error: 'error al crear la tarea'});
    }
});

// actuallizar una tarea por id 

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status} = req.body;

        const db = await connectDB();
        const result = await db.run(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, id]
        );

        if (result.changes === 0 ){
            return res.status(400).json({error: 'la tarea no existe'});
        }

        res.json({id, title, description, status});

    }catch (error){
        res.status(500).json({error: 'Error al actualizar la tarea'});
    }
});


// eliminar tarea por ID 

router.delete('/:id', async (req, res) =>{
    try {
         const { id }= req.params;

         const db = await connectDB();
         const results  = await  db.run('DELETE FROM tasks WHERE id = ?', id);

        if (results.changes === 0 ){
            return res.status(400).json({error: 'la tarea no existe'});
        }

        res.json({message: 'La tarea se ha eliminado con exito'});
    }catch (error){
        res.status(500).json({error: 'error al eliminar la tarea'});
    }
});


export default router;