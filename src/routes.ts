import { randomUUID } from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import { User } from "./entities/User.js";
import { LowDBUsersRepository } from "./repositories/implementations/JSONDatabase/LowDBUsersRepository.js";
import { IUsersRepository } from "./repositories/IUsersRepository.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const usersRepository: IUsersRepository = new LowDBUsersRepository();

type UserInput = {
  name: string;
  email: string;
};

type UserUpdateInput = {
  name: string;
  email: string;
};

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const users = await usersRepository.select(req.query.get("search"));

      return res
        .setHeader("Content-Type", "application/json")
        .end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const { name, email } = req.body as UserInput;

      const user: User = {
        id: randomUUID(),
        name,
        email,
      };

      usersRepository.insert(user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const id = req.params.id as string;
      const { name, email } = req.body as UserUpdateInput;

      const user: User = {
        id,
        name,
        email,
      };

      await usersRepository.update(user);

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: async (req: IncomingMessage, res: ServerResponse) => {
      const id = req.params.id as string;

      await usersRepository.delete(id);

      return res.writeHead(204).end();
    },
  },
];
