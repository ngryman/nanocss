export default concatClassNames = (className1, className2) => {
  return (className1 + (className2 ? ` ${className2}` : ''))
}
