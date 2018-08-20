class Success extends Result {
  map(fn) {
    return new Success(fn(this.value), this.rest)
  }
  bimap(s, f) {
    return new Success(s(this.value), this.rest)
  }
  chain(fn) {
    return fn(this.value, this.rest)
  }
  fold(s, f) {
    return s(this.value, this.rest)
  }
}

module.exports = Success;
