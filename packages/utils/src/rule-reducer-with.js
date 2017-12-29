export default function ruleReducerWith(props, formatter, isDynamic) {
  return function ruleReducer(reduced, value, property) {
    if (isDynamic && typeof value === 'function') {
      return reduced + formatter(property, value(props))
    }
    else if (!isDynamic && typeof value !== 'function') {
      return reduced + formatter(property, value)
    }
    return ''
  }
}
