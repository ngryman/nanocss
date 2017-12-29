export default function CSSSelectorGenerator() {
  let nextIdentifier = 0

  return function generateCSSSelector() {
    return `_${++nextIdentifier}`
  }
}
