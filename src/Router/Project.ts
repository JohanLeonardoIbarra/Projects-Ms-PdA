import { ProjectController } from 'Controller/ProjectController';
import { Router } from 'express';
import validateToken from 'Middleware/Auth';

const projectRouter = Router();
const controller = new ProjectController();

projectRouter.post('/', validateToken, controller.createProject);
projectRouter.get('/list/:course', validateToken, controller.listProjects);
projectRouter.get('/:id', validateToken, controller.findProject);
projectRouter.post('/student', validateToken, controller.addStudent);

export default projectRouter;
