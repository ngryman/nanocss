export default function createSelectorGenerator() {
  let nextIdentifier = 0

  return function generateSelector() {
    return `_${++nextIdentifier}`
  }
}
