import http from "http";

export type Request = http.IncomingMessage & {
  params: Record<string, unknown>;
  query: Map<string, string>;
};
