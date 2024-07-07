import taskDataSchema from '../models/tskData.js';

export const addTask = async (req, res) => {
    try {
        const taskData = new taskDataSchema(req.body);
        const savedTask = await taskData.save();
        res.status(201).send({ taskData: savedTask });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while adding the task' });
    }
};