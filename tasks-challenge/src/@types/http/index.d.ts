declare module "http" {
  export interface IncomingMessage {
    body: unknown;
    params: Record<string, string>;
    query: Map<string, string>;
  }
}
