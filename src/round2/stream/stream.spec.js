const Stream = require('./stream.class');
const s = 'this is a test';
const length = s.length;
const halfLength = Math.round(s.length / 2);

describe('Stream', () => {
  describe('the constructor', () => {
    it('should accept an iterable, cursor, and length', () => {
      const cursor = 0;
      const stream = Object.freeze(new Stream(s, cursor, length));
      expect(stream.iterable).toBe(s);
      expect(stream.cursor).toBe(cursor);
      expect(stream.length).toBe(length);
    });
    it('should default length to the length of the ' +
      'iterable minus the cursor', () => {
        const cursor = 2;
        const stream = Object.freeze(new Stream(s, cursor));
        expect(stream.length).toEqual(s.length - cursor);
      });

    it('should default cursor to 0', () => {
      const stream = Object.freeze(new Stream(s));
      expect(stream.cursor).toBe(0);
    });
  });

  describe('head', () => {
    it('should throw a TypeError when length is <= 0', () => {
      const stream = Object.freeze(new Stream(s, undefined, 0));
      for (let i = 0; i > -3; i--) {
        stream.length = i;
        expect(() => stream.head()).toThrow(TypeError);
      }
    });
    it('should return the element at cursor in iterable', () => {
      const cursor = halfLength;
      const stream = Object.freeze(new Stream(s, cursor));
      expect(stream.head()).toBe(s[cursor]);
    });
  });

  describe('move', () => {
    const distance = halfLength;
    const original = Object.freeze(new Stream(s));
    const moved = original.move(distance);
    it('should create a new object', () => {
      expect(moved).not.toBe(original);
    });
    it('should increment the cursor by the distance', () => {
      expect(moved.cursor).toBe(original.cursor + distance);
    });
    it('should decrement the length by the distance', () => {
      expect(moved.cursor).toBe(original.length - distance);
    });
  });
  describe('slice', () => {
    const stream = Object.freeze(new Stream(s));
    it('should throw an Error if stop < start', () => {
      expect(() => stream.slice(4, 1)).toThrow(Error);
    });
    it('should throw a TypeError if stop > length', () => {
      expect(() => stream.slice(0, stream.length + 1)).toThrow(TypeError);
    });

    const start = halfLength; {
      const stop = Math.round(stream.length * 3 / 4);
      const sliced = Object.freeze(stream.slice(start, stop));
      it('should return a new object', () => {
        expect(sliced).not.toBe(stream);
      });
      it('should have the same iterable', () => {
        expect(sliced.iterable).toBe(stream.iterable);
      });
      it('should increment the new cursor by start', () => {
        expect(sliced.cursor).toBe(stream.cursor + start);
      });
    }

    it('should default stop to length', () => {
      const sliced = Object.freeze(stream.slice(start));
      expect(sliced.length).toBe(stream.length - start);
    });
  });
});