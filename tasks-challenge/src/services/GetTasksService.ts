import { ITasksRepository } from "../repositories/ITasksRepository.js";
import { JSONTasksRepository } from "../repositories/implementations/JSONTasksRepository.js";

export type GetTasksDTO = {
  fullTextSearch?: string;
};

export class GetTasksService {
  constructor(
    private tasksRepository: ITasksRepository = JSONTasksRepository.getInstance()
  ) {}

  public async execute({ fullTextSearch }: GetTasksDTO) {
    const tasks = await this.tasksRepository.find(fullTextSearch);

    return tasks;
  }
}
