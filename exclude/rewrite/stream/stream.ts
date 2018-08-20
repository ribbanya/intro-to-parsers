import { Arraylike } from './arraylike.interface';

class Stream<T> {
  private readonly arraylike: Arraylike<T>;
  private cursor: number;
  private readonly length: number;

  public constructor(arraylike: Arraylike<T>, cursor: number, length: number) {
    this.arraylike = arraylike;
    this.cursor = cursor || 0;
    this.length = length === undefined
      ? arraylike.length - this.cursor
      : length;
  }
  // Get the first value from the iterable.
  public head(): T {
    if (this.length <= 0) {
      throw new TypeError('index out of range');
    }
    return this.arraylike[this.cursor];
  }
  // Consume the stream by moving the cursor.
  public move(distance: number): Stream<T> {
    return new Stream(
      this.arraylike,
      this.cursor + distance,
      this.length - distance,
    );
  }
  // Same interface as Array.slice but returns a new Stream
  public slice(start: number, stop: number): Stream<T> {
    if (stop < start) {
      throw new Error('stop < start');
    }
    if (stop && stop > this.length) {
      throw new TypeError('index out of range');
    }
    return new Stream(
      this.arraylike,
      this.cursor + start,
      (stop || this.length) - start,
    );
  }
}
