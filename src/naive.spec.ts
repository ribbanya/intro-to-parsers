import { char } from './naive';

describe("Check naïve approach", () => {
  test("char(): Parse one character", () => {
    expect(char('a')('abc')).toEqual({ success: true, rest: 'bc' });
    expect(char('b')('abc')).toEqual({ success: false, rest: 'abc' });
  });
})
