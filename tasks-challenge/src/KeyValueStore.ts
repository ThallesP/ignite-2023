export class KeyValueStore {
  static #state: Map<string, unknown> = new Map();

  public static set(token: string, value: unknown) {
    this.#state.set(token.toLowerCase(), value);
  }

  public static get<T extends unknown>(token: string): T {
    return this.#state.get(token.toLowerCase()) as T;
  }

  public static entries<T extends unknown>(): IterableIterator<[string, T]> {
    return this.#state.entries() as IterableIterator<[string, T]>;
  }
}
