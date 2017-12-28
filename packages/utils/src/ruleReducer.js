const ruleReducer = (props, formatter, isDynamic) => (reduced, value, property) => {
  if (isDynamic && typeof value === 'function') {
    return reduced + formatter(property, value(props))
  }
  else if (!isDynamic && typeof value !== 'function') {
    return reduced + formatter(property, value)
  }
  return ''
}

export default ruleReducer
