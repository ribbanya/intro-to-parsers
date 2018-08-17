import { char, either, sequence, string } from './naive';

describe("char", () => {
  it("should succeed and return the rest of the string when the first character of the input matches the parser", () => {
    expect(char('a')('abc')).toEqual({ success: true, rest: 'bc' });
  });
  it("should fail and return the entire input otherwise", () => {
    expect(char('b')('abc')).toEqual({ success: false, rest: 'abc' });
  });
});
describe("sequence", () => {
  it("should consume the entire input and succeed when the parsers each succeed sequentially", () => {
    expect(sequence([char('a'), char('b'), char('c')])('abc')).toEqual({ success: true, rest: '' });
  });
  it("should fail and return the remaining input when one of the parsers fails", () => {
    expect(sequence([char('a'), char('b'), char('a')])('abc')).toEqual({ success: false, rest: 'c' });
  });
});
describe("string", () => {
  it("should succeed and return the remaining input when the parsers collectively begin with the input", () => {
    expect(string('abc')('abcdefg')).toEqual({ success: true, rest: 'defg' });
  });
});
describe("either", () => {
  describe("should succeed and return the remaining input when the input begins with one of the parsers", () => {
    test("first test", () => {
      expect(either([string('abc'), string('abab')])('abcd')).toEqual({ success: true, rest: 'd' });
    });
    test("second test", () => {
      expect(either([string('abc'), string('abab')])('ababab')).toEqual({ success: true, rest: 'ab' });
    });
  });
  it("should fail and return the entire input when the input begins with none of the parsers", () => {
    expect(either([string('abc'), string('abab')])('aba')).toEqual({ success: false, rest: 'aba' });
  });
});
