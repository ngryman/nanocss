import stringAggregator from './stringAggregator'

const reduceArray = (array, reducer, aggregator, initial) => {
  let reduced = initial
  for (let i = 0; i < array.length; i++) {
    reduced = aggregator(reduced, reducer(reduced, array[i], i))
  }
  return reduced
}

const reduceObject = (object, reducer, aggregator, initial) => {
  let reduced = initial
  for (const key in object) {
    reduced = aggregator(reduced, reducer(reduced, object[key], key))
  }
  return reduced
}

const reduce = (collection, reducer, aggregator = stringAggregator(''), initial = '') => {
  if (Array.isArray(collection)) {
    return reduceArray(collection, reducer, aggregator,  initial)
  }
  else {
    return reduceObject(collection, reducer, aggregator, initial)
  }
}

export default reduce
