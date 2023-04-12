import { IncomingMessage, ServerResponse } from "http";
import { MarkTaskAsCompletedService } from "../services/MarkTaskAsCompletedService.js";
import { PatchController } from "../decorators/Patch.js";

@PatchController("/tasks/:id/markCompleted")
export class MarkTaskAsCompletedController {
  constructor(
    private markTaskAsCompletedService = new MarkTaskAsCompletedService()
  ) {}

  async handle(req: IncomingMessage, res: ServerResponse) {
    const { id } = req.params;

    const taskCompleted = await this.markTaskAsCompletedService.execute(id);

    res.writeHead(201).end(JSON.stringify(taskCompleted));
  }
}
