import { IncomingMessage, ServerResponse } from "http";
import { ControllerFoundation } from "../foundation/ControllerFoundation.js";
import { CreateTaskService } from "../services/CreateTaskService.js";
import { PostController } from "../decorators/Post.js";

@PostController("/tasks")
export class CreateTaskController implements ControllerFoundation {
  constructor(private createTaskService = new CreateTaskService()) {}

  public async handle(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) {
    const body = req.body as { title: string; description: string } | null;

    if (body === null) return res.writeHead(400).end();

    if (!body.title || !body.description) {
      return res.writeHead(400).end();
    }

    await this.createTaskService.execute(body);
    return res.writeHead(200).end();
  }
}
