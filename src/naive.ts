interface Result {
  readonly rest: string;
  readonly success: boolean;
}

type Parser = (input: string) => Result;
type Generator = (input: string) => Parser;
type Combinator = (input: Parser[]) => Parser;

export const char: Generator = (c: string): Parser => (
  (input: string): Result => (
    (input[0] === c)
      ? { success: true, rest: input.slice(1) }
      : { success: false, rest: input }
  )
);

export const sequence: Combinator = (parsers: Parser[]): Parser => (
  (input: string): Result => {
    let next: string = input;
    for (const p of parsers) {
      const { success, rest } = p(next);
      if (!success) {
        return { success, rest };
      }
      next = rest;
    }
    return { success: true, rest: next };
  }
);

export const stringify: Generator = (str: string): Parser => (
  sequence([...str].map(char))
);

export const either: Combinator = (parsers: Parser[]): Parser => (
  (input: string): Result => {
    for (const p of parsers) {
      const { success, rest } = p(input);
      if (success) {
        return { success, rest };
      }
    }
    return { success: false, rest: input };
  }
);

export const parser: Parser = sequence([
  either([stringify('ab'), stringify('dc')]),
  either([stringify('ba'), stringify('cd')]),
]);

// TODO: nOrMore(), maybe()
