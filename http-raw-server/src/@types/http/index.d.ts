declare module "http" {
  export interface IncomingMessage {
    body: unknown;
    params: Record<string, unknown>;
    query: Map<string, string>;
  }
}
