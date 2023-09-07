export class Register<K, V> {
  #data: Map<K, V>;

  constructor() {
    this.#data = new Map<K, V>();
  }

  set(k: K, v: V) {
    this.#data.set(k, v);
  }

  get(k: K) {
    return this.#data.get(k);
  }
}
