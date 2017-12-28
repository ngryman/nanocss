const stringAggregator = (separator = ' ') => (string1, string2) => {
  if (!string1) return string2
  return (string1 + (string2 ? separator + string2 : ''))
}

export default stringAggregator
