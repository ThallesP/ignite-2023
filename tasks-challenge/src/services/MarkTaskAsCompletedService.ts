import { Task } from "../entities/Task.js";
import { BaseException } from "../foundation/BaseException.js";
import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";

export class MarkTaskAsCompletedService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  async execute(id: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) throw new BaseException("Task not found", 404);

    if (task.completed_at)
      throw new BaseException("Task already completed", 400);

    const taskCompleted = new Task(
      {
        ...task,
        completed_at: new Date(),
      },
      task.id
    );

    await this.tasksRepository.update(taskCompleted);

    return taskCompleted;
  }
}
