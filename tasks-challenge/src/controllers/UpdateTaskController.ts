import { IncomingMessage, ServerResponse } from "http";
import { UpdateTaskService } from "../services/UpdateTaskService.js";
import { PutController } from "../decorators/Put.js";

@PutController("/tasks/:id")
export class UpdateTaskController {
  constructor(private updateTaskService = new UpdateTaskService()) {}

  public async handle(req: IncomingMessage, res: ServerResponse) {
    const { id } = req.params;

    const body = req.body as {
      title: string;
      description: string;
    } | null;

    if (!body) return res.writeHead(400).end();

    if (!body.title || !body.description) return res.writeHead(400).end();

    const task = await this.updateTaskService.execute({
      id,
      title: body.title,
      description: body.description,
    });

    res.end(JSON.stringify(task));
  }
}
