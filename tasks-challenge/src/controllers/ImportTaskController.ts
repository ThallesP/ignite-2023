import { IncomingMessage, ServerResponse } from "http";
import { PostController } from "../decorators/Post.js";
import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";
import { ImportTasksService } from "../services/ImportTasksService.js";
import { Readable } from "stream";

@PostController("/tasks/import")
export class ImportTaskController {
  constructor(
    private importTasksService: ImportTasksService = new ImportTasksService()
  ) {}

  async handle(req: IncomingMessage, res: ServerResponse) {
    if (!(req.body instanceof Readable)) return res.writeHead(400).end();

    await this.importTasksService.execute(req.body);

    res.writeHead(204).end();
  }
}
