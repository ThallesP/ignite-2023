import { IncomingMessage, ServerResponse } from "http";
import { ControllerFoundation } from "../foundation/ControllerFoundation.js";
import { GetTasksService } from "../services/GetTasksService.js";
import { GetController } from "../decorators/Get.js";

@GetController("/tasks")
export class GetTasksController implements ControllerFoundation {
  constructor(private getTasksService = new GetTasksService()) {}

  public async handle(req: IncomingMessage, res: ServerResponse) {
    const fullTextSearch = req.query.get("fullTextSearch");

    const tasks = await this.getTasksService.execute({ fullTextSearch });

    res.end(JSON.stringify(tasks));
  }
}
