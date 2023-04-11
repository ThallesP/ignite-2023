import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import lodash from "lodash";
import { User } from "../../../entities/User.js";
import { IUsersRepository } from "../../IUsersRepository.js";

interface Schema {
  users: User[];
}

const databasePath = new URL("../../../../data/db.json", import.meta.url);

class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

export class LowDBUsersRepository implements IUsersRepository {
  #db: LowWithLodash<Schema>;

  constructor() {
    const adapter = new JSONFile<Schema>(databasePath.pathname);
    this.#db = new LowWithLodash<Schema>(adapter);
    this.#read().then(() => {
      console.log("> Database is ready!");
    });
  }

  async update(user: User): Promise<void> {
    this.#db.chain.get("users").find({ id: user.id }).assign(user).value();
    await this.#db.write();
  }

  async #read() {
    await this.#db.read();
    if (!this.#db.data?.users) this.#db.data = { users: [] };
  }

  async delete(id: string) {
    this.#db.chain.get("users").remove({ id }).commit();
    await this.#db.write();
  }

  async select(search?: string): Promise<User[]> {
    await this.#db.read();

    return this.#db.data?.users.filter((user) =>
      Object.values(user).some((val) => val.includes(search ?? ""))
    ) as User[];
  }

  async insert(user: User): Promise<void> {
    this.#db.data?.users.push(user);

    await this.#db.write();
  }
}
