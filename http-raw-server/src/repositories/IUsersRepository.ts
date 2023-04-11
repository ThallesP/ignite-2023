import { User } from "../entities/User.js";

export interface IUsersRepository {
  select(search?: string): Promise<User[]>;

  insert(data: User): Promise<void>;

  delete(id: string): Promise<void>;

  update(user: User): Promise<void>;
}
