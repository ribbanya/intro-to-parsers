const Failure = require('./results/failure.class');
const Success = require('./results/success.class');
const Parser = require('./parser/parser.class');

const {
  char
} = require('./round2');

describe('Example 1', () => {

  const _char = char('a');
  const _result = _char.run('a');
  const _fold = _result.fold(
    v => console.log('success', v), e => console.log('error', e)
  );
  // => success a

  char('a')
    .run('b')
    .fold(
      v => console.log('success', v), e => console.log('error', e)
    )
  // => error predicate did not match
})