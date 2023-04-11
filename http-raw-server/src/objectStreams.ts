import { Readable, Transform, Writable } from "stream";

class OneToHundredStream extends Readable {
  index = 1;

  constructor() {
    super({ objectMode: true });
  }

  _read() {
    const i = this.index++;

    setTimeout(() => {
      this.push({ x: Math.random() });
    }, 1000);
  }
}

class PrintStreamToConsole extends Writable {
  constructor() {
    super({ objectMode: true });
  }

  async _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void
  ): Promise<void> {
    console.log(Buffer.from(chunk).toString());
    callback();
  }
}

// Object mode can push normal javascript values, but it can't be read in Writable streams, so we need to Transform it to an accepted Stream value (Buffer, ArrayBuffer, or Array or an Array-like Object)
class ConvertJSONToString extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: any, encoding: any, callback: any) {
    const transformed = JSON.stringify(chunk);

    callback(null, Buffer.from(transformed));
  }
}

new OneToHundredStream()
  .pipe(new ConvertJSONToString()) // Without this, it would fail
  .pipe(new PrintStreamToConsole());
