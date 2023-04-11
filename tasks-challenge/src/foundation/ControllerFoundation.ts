import http, { IncomingMessage } from "http";

export interface ControllerFoundation {
  handle(req: IncomingMessage, res: http.ServerResponse): any;
}

export type ControllerFoundationConstructable = new () => ControllerFoundation;
