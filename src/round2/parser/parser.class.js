const Stream = require('../stream');

class Parser {
  constructor(parse) {
    this.parse = parse;
  }
  run(iterable) {
    if (iterable instanceof Stream) {
      return this.parse(iterable);
    } else {
      return this.parse(new Stream(iterable));
    }
  }
  map(f) {
    return new Parser(stream => this.parse(stream).map(f));
  }
  bimap(s, f) {
    return new Parser(stream => this.parse(stream).bimap(s, f));
  }
  chain(f) {
    return new Parser(stream =>
      this.parse(stream).chain((v, s) => f(v).run(s)));
  }
  fold(s, f) {
    return new Parser(stream => this.parse(stream).fold(s, f));
  }
}

module.exports = Parser;