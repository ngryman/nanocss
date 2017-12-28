import test from 'ava'

import Rule from '../src/rule'

test('create a rule', t => {
  const rule = Rule('display', 'flex')
  t.snapshot(rule)
})
