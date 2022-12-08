import { TaskController } from 'Controller/TaskController';
import { Router } from 'express';
import validateToken from 'Middleware/Auth';

const taskRouter = Router();
const controller = new TaskController();

taskRouter.post('/', validateToken, controller.createTask);
taskRouter.post('/addEntry', validateToken, controller.addEntry);
taskRouter.post('/check', validateToken, controller.checkTask);

export default taskRouter;
