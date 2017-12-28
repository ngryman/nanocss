import test from 'ava'

import keyFrom from '../src/key-from'

const object = {
  display: 'flex',
  alignItems: 'center'
}

const objectWithFunc = {
  ...object,
  flexDirection: direction => direction
}

test('create a unique key from an object', t => {
  const key = keyFrom(object)
  t.snapshot(key)
})

test('create a unique key from an object with functions', t => {
  const key = keyFrom(objectWithFunc)
  t.snapshot(key)
})

test('create the same key for the same object', t => {
  const key1 = keyFrom(objectWithFunc)
  const key2 = keyFrom(objectWithFunc)
  t.is(key1, key2)
})
