import { writeFile, readFile } from "fs/promises";
import { User } from "../../../entities/User.js";
import { IUsersRepository } from "../../IUsersRepository.js";

const databasePath = new URL("../../../../data/db.json", import.meta.url);

interface DatabaseData {
  users: User[];
}

export class JSONUsersRepository implements IUsersRepository {
  #database: DatabaseData = {
    users: [],
  };

  constructor() {
    readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  async update(user: User): Promise<void> {
    const userIndex = this.#database.users.findIndex((u) => u.id === user.id);

    if (userIndex <= -1) return;

    this.#database.users[userIndex] = user;

    this.#persist();
  }

  #persist() {
    writeFile(databasePath.pathname, JSON.stringify(this.#database));
  }

  async delete(id: string) {
    const user = this.#database.users.findIndex((u) => u.id === id);

    if (user <= -1) return;

    this.#database.users.splice(user, 1);

    this.#persist();
  }

  async select(search?: string): Promise<User[]> {
    return this.#database.users.filter((user) =>
      Object.values(user).some((val) => val.includes(search ?? ""))
    );
  }

  async insert(user: User): Promise<void> {
    this.#database.users.push(user);

    this.#persist();
  }
}
