import { Task } from "../entities/Task.js";
import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";

export type CreateTaskDTO = {
  title: string;
  description: string;
};

export class CreateTaskService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  async execute({ title, description }: CreateTaskDTO) {
    const task = new Task({
      title,
      description,
    });

    await this.tasksRepository.create(task);
  }
}
