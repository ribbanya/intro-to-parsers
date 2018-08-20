class Failure extends Result {
  map(fn) {
    return this
  }
  bimap(s, f) {
    return new Failure(f(this.value), this.rest)
  }
  chain(fn) {
    return this
  }
  fold(s, f) {
    return f(this.value, this.rest)
  }
}

module.exports = Failure;