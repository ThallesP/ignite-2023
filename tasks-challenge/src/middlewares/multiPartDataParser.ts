import { Transform, TransformCallback } from "stream";

export class MultipartDataParser extends Transform {
  foundEmptyLine = false;

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const lines = chunk.toString().split("\r\n");

    for (const line of lines) {
      if (line === "") {
        this.foundEmptyLine = true;
        continue;
      }

      if (this.foundEmptyLine) {
        if (line.startsWith("--") && line.endsWith("--")) {
          continue;
        }
        this.push(line);
      }
    }

    callback(null);
  }
}
