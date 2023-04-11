import { writeFile, readFile } from "fs/promises";
import { ITasksRepository } from "../ITasksRepository.js";
import { Task } from "../../entities/Task.js";

const databasePath = new URL("../../../data/db.json", import.meta.url);

interface DatabaseData {
  tasks: Task[];
}

export class JSONTasksRepository implements ITasksRepository {
  private static instance: JSONTasksRepository;

  #database: DatabaseData = {
    tasks: [],
  };

  private constructor() {
    readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(async () => {
        await this.#persist();
      });
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.#database.tasks.find((t) => t.id === id);

    return task ?? null;
  }

  public static getInstance(): ITasksRepository {
    if (!JSONTasksRepository.instance) {
      JSONTasksRepository.instance = new JSONTasksRepository();
    }

    return JSONTasksRepository.instance;
  }

  async update(task: Task): Promise<void> {
    const taskIndex = this.#database.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex <= -1) return;

    this.#database.tasks[taskIndex] = task;

    await this.#persist();
  }

  async #persist() {
    await writeFile(
      databasePath.pathname,
      JSON.stringify(this.#database, null, 2)
    );
  }

  /*async delete(id: string) {
    const user = this.#database.users.findIndex((u) => u.id === id);

    if (user <= -1) return;

    this.#database.users.splice(user, 1);

    this.#persist();
  }*/

  async find(search?: string): Promise<Task[]> {
    return this.#database.tasks.filter((task) =>
      Object.values(task).some((val) => val.includes(search ?? ""))
    );
  }

  async create(task: Task): Promise<void> {
    this.#database.tasks.push(task);

    await this.#persist();
  }
}
