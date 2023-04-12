import { IncomingMessage, ServerResponse } from "http";
import { DeleteTaskService } from "../services/DeleteTaskService.js";
import { DeleteController } from "../decorators/Delete.js";

@DeleteController("/tasks/:id")
export class DeleteTaskController {
  constructor(private deleteTaskService = new DeleteTaskService()) {}

  async handle(req: IncomingMessage, res: ServerResponse) {
    const { id } = req.params;

    await this.deleteTaskService.execute({ id });

    res.writeHead(204).end();
  }
}
