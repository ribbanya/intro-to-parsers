
// const Success = require('./success.class').default;


beforeAll(() => {
  Result = require('./result.class');
  Success = require('./success.class');
  Failure = require('./failure.class');

  toUpperCase = v => v.toUpperCase();
  double = v => v.repeat(2)
  concat = (a, b) => a + ' ' + b;
  swap = (a, b) => b + ' ' + a;

  result = Object.freeze(new Result('this is', 'a test'));
  success = Object.freeze(Object.assign(new Success(), result));
  failure = Object.freeze(Object.assign(new Failure(), result));
});

describe('Result', () => {
  it('should store the values it\'s created with', () => {
    expect(result).toEqual({ value: 'this is', rest: 'a test' });
  });
});

describe('Success', () => {
  it('should be equivalent to instances of Result', () => {
    expect(success).toEqual(result);
  })
  describe('map', () => {
    it('should wrap its own value in the given function', () => {
      expect(success.map(toUpperCase))
        .toEqual({
          value: toUpperCase(success.value),
          rest: success.rest
        });
    });
  });
  describe('bimap', () => {
    it('should be the same as map on the first argument and '
      + 'ignore the second argument', () => {
        expect(success.bimap(toUpperCase, double))
          .toEqual(success.map(toUpperCase));
      })
  })
  describe('chain', () => {
    it("should factor 'value' and 'rest' into the same function", () => {
      expect(success.chain(concat))
        .toEqual(concat(success.value, success.rest));
    });
  });
  describe('fold', () => {
    it('should be the same as chain on the first argument and '
      + 'ignore the second argument', () => {
        expect(success.fold(concat, swap))
          .toEqual(success.chain(concat));
      })
  })
})


describe('Failure', () => {
  it('should be equivalent to instances of Result', () => {
    expect(failure).toEqual(result);
  })
  describe('map', () => {
    it('should return itself and ignore the function', () => {
      expect(failure.map(toUpperCase))
        .toBe(failure);
    })
  })
  describe('bimap', () => {
    it('should wrap its own value in the second argument ' +
      'and ignore the first', () => {
        expect(failure.bimap(toUpperCase, double))
          .toEqual({
            value: double(failure.value),
            rest: failure.rest
          });
      });
  });
  describe('chain', () => {
    it("should return itself", () => {
      expect(failure.chain(concat)).toBe(failure);
    });
  });
  describe('fold', () => {
    it("should factor 'value' and 'rest' into the second argument", () => {
      expect(failure.fold(concat, swap))
        .toEqual(swap(failure.value, failure.rest));
    })
  })
})
