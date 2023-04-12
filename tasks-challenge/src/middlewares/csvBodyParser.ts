import { IncomingMessage } from "http";
import { MultipartDataParser } from "./multiPartDataParser.js";
import { parse } from "csv-parse";

export async function csvBodyParser(req: IncomingMessage) {
  try {
    req.body = req
      .pipe(new MultipartDataParser())
      .pipe(parse({ columns: true }));
  } catch (error) {
    req.body = null;
  }
}
