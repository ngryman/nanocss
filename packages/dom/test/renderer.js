import test from 'ava'

import { dynamic } from '@nanocss/utils'
import createRenderer from '../src/renderer'

const staticRule = {
  fontSize: '1rem'
}

const dynamicRule = {
  ...staticRule,
  color: ({ color }) => color
}

const complexRule = {
  ...dynamicRule,
  margin: '1rem',
  padding: value => value
}

test('render a rule', t => {
  const render = createRenderer()
  const selectors = render(staticRule)
  t.snapshot(selectors)
})

test('memoize a similar rendering', t => {
  const render = createRenderer()
  const selectors1 = render(staticRule)
  const selectors2 = render(Object.assign({}, staticRule))
  t.is(selectors1, selectors2)
})

test('render a dynamic rule', t => {
  const render = createRenderer()
  const selectors = render(dynamicRule)
  t.snapshot(selectors)
})

test('memoize similar static and dynamic rendering', t => {
  const render = createRenderer()
  const selectors1 = render(dynamicRule)
  const selectors11 = render(Object.assign({}, dynamicRule))
  t.is(selectors1, selectors11)
})

test('memoize similar static rendering accross rules', t => {
  const render = createRenderer()
  const selectors1 = render(staticRule)
  const selectors2 = render(dynamicRule)
  t.is(selectors1, selectors2.split(' ')[0])
})

test('render variations of a rule', t => {
  const render = createRenderer()
  const selectors1 = render(dynamicRule)
  const selectors2 = render(dynamicRule, { color: 'blue' })
  t.snapshot(selectors1)
  t.snapshot(selectors2)
})

test('memoize and render erractic renderings', t => {
  const render = createRenderer()
  const selectors1 = render(dynamicRule, { color: 'blue' })
  const selectors2 = render(dynamicRule, { color: 'white' })
  const selectors21 = render(dynamicRule, { color: 'white' })
  const selectors11 = render(dynamicRule, { color: 'blue' })
  const selectors3 = render(dynamicRule, { color: 'red' })
  t.snapshot(selectors1)
  t.snapshot(selectors2)
  t.snapshot(selectors3)
  t.is(selectors1, selectors11)
  t.is(selectors2, selectors21)
})

test('group static and dynamic declarations', t => {
  const render = createRenderer()
  const selectors = render(complexRule)
})

test.todo('remove undefined declarations')

// test('render a rule set keeping static rules along mulitple renders', t => {
//   const selectors1 = render(complexRuleSet, { flexDirection: 'row', color: 'blue' })
//   t.is(selectors1, 'a a/a')
//   const selectors2 = render(complexRuleSet, { flexDirection: 'column', color: 'red' })
//   t.is(selectors1, 'a a/b')
// })
