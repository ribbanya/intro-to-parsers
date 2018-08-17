interface Result {
  readonly success: boolean;
  readonly rest: string;
}

type Parser = (input: string) => Result;

export function char(c: string): Parser {
  return (input: string): Result => {
    return (input[0] === c)
      ? { success: true, rest: input.slice(1) }
      : { success: false, rest: input };
  }
}

export function sequence(parsers: Parser[]): Parser {
  return (input: string): Result => {
    let next = input
    for (let i = 0; i < parsers.length; i++) {
      const parser = parsers[i]
      const { success, rest } = parser(next)
      if (!success) {
        return { success, rest }
      }
      next = rest
    }
    return { success: true, rest: next }
  }
}

export function string(str: string): Parser {
  return sequence([...str].map(char))
}

export function either(parsers: Parser[]): Parser {
  return (input: string): Result => {
    for (var i = 0; i < parsers.length; i++) {
      const parser = parsers[i]
      const { success, rest } = parser(input)
      if (success) {
        return { success, rest }
      }
    }
    return { success: false, rest: input }
  }
}
