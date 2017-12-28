import test from 'ava'

test('create a Declaration from a template literal', t => {
  const rule = Declaration({
    fontSize: '2rem',
    color: 'inherit',
    borderColor: val => val
  })
  t.snapshot(rule)

  // const staticRules = [
  //   { name: 'fontSize', value: '2rem' },
  //   { name: 'color', value: 'inherit' }
  // ]

  // const dynamicRules = [
  //   { name: 'fontSize', value: val => val }
  // ]
})

const renderer = createDOMRenderer()
const classNames = renderer.render(rule, props)

