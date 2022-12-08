import express from 'express';
import cors from 'cors';
import projectRouter from 'Router/Project';
import taskRouter from 'Router/Task';

export class Server {
  private app = express();
  private port: number;

  constructor() {
    this.port = 8082;
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
    this.routes();
  }

  public init(port?: number): void {
    if (port) this.port = port;

    this.listen();
  }

  private routes(): void {
    this.app.use('/project', projectRouter);
    this.app.use('/task', taskRouter);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log('Server listening on port: ' + this.port);
    });
  }
}
