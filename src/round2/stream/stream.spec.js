const Stream = require('./stream.class');
const s = 'this is a test';
describe('Stream', () => {
  beforeAll(() => { });
  describe('the constructor', () => {
    it('should accept an iterable, cursor, and length', () => {
      const cursor = 0;
      const length = s.length;
      const stream = new Stream(s, cursor, length);
      expect(stream.iterable).toBe(s);
      expect(stream.cursor).toBe(cursor);
      expect(stream.length).toBe(length);
    });
    it('should default length to the length of the ' +
      'iterable minus the cursor', () => {
        const cursor = 2;
        const stream = new Stream(s, cursor);
        expect(stream.length).toEqual(s.length - cursor);
      });

    it('should default cursor to 0', () => {
      const stream = new Stream(s);
      expect(stream.cursor).toBe(0);
    });
  });
  describe('head', () => {
    it('should throw a TypeError when length is <= 0', () => {
      const stream = new Stream(s, undefined, 0);
      for (let i = 0; i > -3; i++) {
        stream.length = i;
        expect(stream.head).toThrow(TypeError);
      }
    });
    it('should return the element at cursor in iterable', () => {
      const stream = new Stream(s, 4, )
    })
  });
});
