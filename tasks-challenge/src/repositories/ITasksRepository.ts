import { Task } from "../entities/Task.js";

export interface ITasksRepository {
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  find(fullTextSearch?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
}
