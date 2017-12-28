import test from 'ava'

import cssValueFrom from '../src/css-value-from'

test('return the CSS pixel version of a number', t => {
  const cssValue = cssValueFrom(10)
  t.snapshot(cssValue)
})

test('return the exact same value if not a number', t => {
  const cssValue = cssValueFrom('10rem')
  t.snapshot(cssValue)
})
