const Parser = require('./parser');
const {
  Failure
} = require('./results');

const char0 = c =>
  new Parser(stream => {
    if (stream.length === 0) {
      return new Failure('unexpected end', stream);
    }
    const value = stream.head()
    if (value === c) {
      return new Success(value, stream.move(1))
    }
    return new Failure('char did not match', stream);
  })

const where = predicate =>
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

module.exports = {
  char,
  char0,
  where,
};