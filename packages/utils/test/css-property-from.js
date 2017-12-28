import test from 'ava'

import cssPropertyFrom from '../src/css-property-from'

test('return the CSS version of a camel cased property name', t => {
  const cssName = cssPropertyFrom('borderBottomRadius')
  t.snapshot(cssName)
})
