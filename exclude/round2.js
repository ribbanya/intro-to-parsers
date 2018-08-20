


export class Failure extends Result {
  map(fn) {
    return this
  }
  bimap({ }, f) {
    return new Failure(f(this.value), this.rest)
  }
  chain(fn) {
    return this
  }
  fold({ }, f) {
    return f(this.value, this.rest)
  }
}


export class Parser {
  constructor(parse) {
    this.parse = parse
  }
  run(iterable) {
    if (iterable instanceof Stream) {
      return this.parse(iterable)
    } else {
      return this.parse(new Stream(iterable))
    }
  }
  map(f) {
    return new Parser(stream => this.parse(stream).map(f))
  }
  bimap(s, f) {
    return new Parser(stream => this.parse(stream).bimap(s, f))
  }
  chain(f) {
    return new Parser(stream =>
      this.parse(stream).chain((v, s) => f(v).run(s)))
  }
  fold(s, f) {
    return new Parser(stream => this.parse(stream).fold(s, f))
  }
}

export const char1 = (c) => (
  new Parser(stream => {
    if (stream.length === 0) {
      return new Failure('unexpected end', stream)
    }
    const value = stream.head()
    if (value === c) {
      return new Success(value, stream.move(1))
    }
    return new Failure('char did not match', stream)
  })
)

export const where = predicate =>
  new Parser(stream => {
    if (stream.length === 0) {
      return new Failure('unexpected end', stream)
    }
    const value = stream.head()
    if (predicate(value)) {
      return new Success(value, stream.move(1))
    }
    return new Failure('predicate did not match', stream)
  })

const char = c => where(x => x === c)


char('a')
  .run('a')
  .fold(
    v => console.log('success', v),
    e => console.log('error', e)
  )
// => success a

char('a')
  .run('b')
  .fold(
    v => console.log('success', v),
    e => console.log('error', e)
  )
// => error predicate did not match
