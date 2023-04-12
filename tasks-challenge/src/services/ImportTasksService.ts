import { Readable } from "stream";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";
import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { Task } from "../entities/Task.js";

export class ImportTasksService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  async execute(file: Readable) {
    for await (const record of file) {
      const task = new Task({
        title: record.title,
        description: record.description,
      });

      await this.tasksRepository.create(task);
    }
  }
}
