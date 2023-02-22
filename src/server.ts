import http from "node:http";
import { jsonBodyParser } from "./middlewares/jsonBodyParser.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extractQueryParams.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await jsonBodyParser(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path.test(url as string)
  );

  if (!route) return res.writeHead(404).end();

  const routeParams = req.url?.match(route.path);

  const { query, ...params } = routeParams?.groups as unknown as {
    params: Record<string, string>;
    query: string;
  };

  req.params = params;
  req.query = extractQueryParams(query);

  return route.handler(req, res);
});

server.listen(3333, () => {
  console.log("> Server ready!");
});
