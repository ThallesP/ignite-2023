import { BaseException } from "../foundation/BaseException.js";
import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";

export type DeleteTaskDTO = {
  id: string;
};

export class DeleteTaskService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  async execute({ id }: DeleteTaskDTO) {
    const task = await this.tasksRepository.findById(id);

    if (!task) throw new BaseException("Task not found", 404);

    await this.tasksRepository.delete(id);
  }
}
