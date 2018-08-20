import { char, either, parser, sequence, stringify } from './naive';

describe('char', () => {
  it(
    'should succeed and return the rest of the string when ' +
    'the first character of the input matches the parser',
    () => {
      expect(char('a')('abc'))
        .toEqual({ success: true, rest: 'bc' });
    },
  );
  it('should fail and return the entire input otherwise', () => {
    expect(char('b')('abc'))
      .toEqual({ success: false, rest: 'abc' });
  });
});
describe('sequence', () => {
  it('should consume the entire input and succeed when '
    + 'the parsers each succeed sequentially', () => {
      expect(sequence([char('a'), char('b'), char('c')])('abc'))
        .toEqual({ rest: '', success: true });
    });
  it('should fail and return the remaining input when '
    + 'one of the parsers fails', () => {
      expect(sequence([char('a'), char('b'), char('a')])('abc'))
        .toEqual({ success: false, rest: 'c' });
    });
});
describe('string', () => {
  it('should succeed and return the remaining input when '
    + 'the parsers collectively begin with the input', () => {
      expect(stringify('abc')('abcdefg'))
        .toEqual({ success: true, rest: 'defg' });
    });
});
describe('either', () => {
  describe('should succeed and return the remaining input when ' +
    'the input begins with one of the parsers', () => {
      test('first test', () => {
        expect(either([stringify('abc'), stringify('abab')])('abcd'))
          .toEqual({ success: true, rest: 'd' });
      });
      test('second test', () => {
        expect(either([stringify('abc'), stringify('abab')])('ababab'))
          .toEqual({ success: true, rest: 'ab' });
      });
    });
  it('should fail and return the entire input when '
    + 'the input begins with none of the parsers', () => {
      expect(either([stringify('abc'), stringify('abab')])('aba'))
        .toEqual({ success: false, rest: 'aba' });
    });
});
describe('parser', () => {
  describe('should succeed with no remaining input when passed...', () => {
    test("...'abcd'", () => {
      expect(parser('abcd')).toEqual({ success: true, rest: '' });
    });
    test("...'dcba'", () => {
      expect(parser('dcba')).toEqual({ success: true, rest: '' });
    });
    test("...'abba'", () => {
      expect(parser('abba')).toEqual({ success: true, rest: '' });
    });
  });
  describe("should fail with remaining input 'dc' when passed...", () => {
    test("...'abdc'", () => {
      expect(parser('abdc')).toEqual({ success: false, rest: 'dc' });
    });
  });
});
