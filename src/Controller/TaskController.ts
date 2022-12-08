import { Request, Response } from 'express';
import Project from 'Model/Project';
import Task from '../Model/Task';

export class TaskController {
  async createTask(req: Request, res: Response) {
    const { user, name, description, projectId } = req.body;

    if (user.role !== 'teacher') return res.sendStatus(401);
    if ([name, description, projectId].includes(undefined)) res.sendStatus(400);

    const task = new Task({
      name,
      description,
      status: false,
      qualification: 0.0,
    });

    await task.save();

    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { tasks: task },
      },
      { new: true }
    );

    if (!project) return res.sendStatus(404);

    return res.send({ success: true });
  }

  async addEntry(req: Request, res: Response) {
    const { user, taskId, entry, comment } = req.body;

    if (user.role !== 'student') return res.sendStatus(401);

    const task = await Task.findOneAndUpdate(
      { _id: taskId, status: false },
      {
        comment,
        $push: { files: entry },
      },
      {
        new: true,
      }
    );

    if (!task) return res.sendStatus(404);

    return res.send({ success: true });
  }

  async checkTask(req: Request, res: Response) {
    const { user, taskId, qualification, status } = req.body;

    if (user.role !== 'teacher') return res.sendStatus(401);

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        qualification,
        status,
      },
      {
        new: true,
      }
    );

    if (!task) return res.sendStatus(404);

    return res.send({ success: true });
  }
}
