import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";

export type UpdateTaskDTO = {
  id: string;
  title: string;
  description: string;
};

export class UpdateTaskService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  async execute({ description, id, title }: UpdateTaskDTO) {
    const task = await this.tasksRepository.findById(id);

    if (!task) throw new Error("Task not found");

    await this.tasksRepository.update({
      ...task,
      title,
      description,
    });
  }
}
