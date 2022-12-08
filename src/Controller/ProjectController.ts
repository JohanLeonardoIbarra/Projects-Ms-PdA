import { Request, Response } from 'express';
import Project from 'Model/Project';
import { isValidObjectId } from 'mongoose';

export class ProjectController {
  async createProject(req: Request, res: Response) {
    const { user, name, description, course, members } = req.body;

    if (user.role !== 'teacher') return res.sendStatus(401);
    if ([name, description, course].includes(undefined))
      return res.sendStatus(400);
    if (members < 1) res.sendStatus(400);

    const project = new Project({
      name,
      description,
      course,
      members,
      status: false,
    });

    await project.save();

    res.send({ success: true });
  }

  async addStudent(req: Request, res: Response) {
    const { user, studentEmail, projectId } = req.body;

    if (user.role !== 'teacher' && user.role !== 'student')
      return res.sendStatus(401);

    let student = studentEmail;

    if (!projectId) return res.sendStatus(400);

    if (user.role === 'student' && !student) student = user.email;

    if (!student) return res.sendStatus(400);

    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
        students: { $elemMatch: student },
      },
      {
        $push: {
          students: student,
        },
      },
      {
        new: true,
      }
    );

    if (!project) return res.sendStatus(404);

    return res.send({ success: true });
  }

  async listProjects(req: Request, res: Response) {
    const { user } = req.body;
    const { course } = req.params;

    if (user.role !== 'teacher' && user.role !== 'student')
      return res.sendStatus(401);

    if (user.role === 'student') {
      const projects = await Project.find({
        students: { $elemMatch: user.email },
      }).populate('tasks');

      return res.send(projects);
    }

    if (!course) return res.sendStatus(400);

    const projects = await Project.find({
      course,
    }).populate('tasks');

    return res.send(projects);
  }

  async findProject(req: Request, res: Response) {
    const { user } = req.body;
    const { id } = req.params;

    if (user.role !== 'teacher' && user.role !== 'student')
      return res.sendStatus(401);

    if (!isValidObjectId(id)) return res.sendStatus(404);

    const project = await Project.findById(id);

    if (!project) return res.sendStatus(404);

    return res.send(project);
  }
}
