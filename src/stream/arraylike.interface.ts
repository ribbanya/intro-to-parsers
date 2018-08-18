export interface Arraylike<T> {
  readonly [key: number]: T;
  readonly length: number;
}
