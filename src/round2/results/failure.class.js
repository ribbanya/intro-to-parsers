'use strict';
const Result = require('./result.class');

class Failure extends Result {
  map() {
    return this;
  }
  bimap(s, f) {
    return new Failure(f(this.value), this.rest);
  }
  chain() {
    return this;
  }
  fold(s, f) {
    return f(this.value, this.rest);
  }
}

module.exports = Failure;