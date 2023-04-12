import http from "http";
import { KeyValueStore } from "./KeyValueStore.js";
import { ControllerFoundation } from "./foundation/ControllerFoundation.js";
import { extractQueryParams } from "./foundation/ExtractQueryParams.js";
import { jsonBodyParser } from "./middlewares/jsonBodyParser.js";
import { BaseException } from "./foundation/BaseException.js";
import { parse } from "csv-parse";
import { csvBodyParser } from "./middlewares/csvBodyParser.js";
interface ControllerMetadata {
  instance: ControllerFoundation;
  path: RegExp;
  method: string;
}

export class Server extends http.Server {
  private static instance: Server;

  private constructor() {
    super();
  }

  static getInstance(): Server {
    if (!this.instance) {
      this.instance = new Server();
    }

    return this.instance;
  }

  async init() {
    this.listen(3333, async () => {
      console.log("> Server is running");
    });

    await this.#initDecorators();
    await this.#initRouter();
  }

  async #initDecorators() {
    await import("./controllers/CreateTaskController.js");
    await import("./controllers/GetTasksController.js");
    await import("./controllers/UpdateTaskController.js");
    await import("./controllers/DeleteTaskController.js");
    await import("./controllers/MarkTaskAsCompletedController.js");
    await import("./controllers/ImportTaskController.js");
  }

  async #initRouter() {
    this.on("request", async (req, res) => {
      let controllerMetadata;
      for (const [
        name,
        metadata,
      ] of KeyValueStore.entries<ControllerMetadata>()) {
        if (
          metadata.method === req.method &&
          metadata.path.test(req.url as string)
        ) {
          controllerMetadata = metadata;
        }
      }

      if (!controllerMetadata) return res.writeHead(404).end();

      const routeParams = req.url?.match(controllerMetadata?.path);

      const { query, ...params } = routeParams?.groups as any;

      req.params = params;
      req.query = extractQueryParams(query);

      if (req.headers["content-type"]?.includes("multipart/form-data")) {
        await csvBodyParser(req);
      } else if (req.headers["content-type"]?.includes("application/json")) {
        await jsonBodyParser(req, res);
      }

      try {
        await controllerMetadata.instance.handle(req, res);
      } catch (error) {
        if (error instanceof BaseException) {
          return res.writeHead(error.statusCode).end(
            JSON.stringify({
              message: error.message,
              statusCode: error.statusCode,
            })
          );
        }

        return res.writeHead(500).end();
      }
    });
  }
}

const server = Server.getInstance();

await server.init();
