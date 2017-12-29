const RE_CAMELCASE = /\.?([A-Z])/g

const replacer = (_, c) =>
  '-' + c.toLowerCase()

const toCSSProperty = (property) =>
  property.replace(RE_CAMELCASE, replacer)

const toCSSValue = (value) =>
  (typeof value === 'number' ? `${value}px` : value)

export default function toCSSDeclaration(property, value) {
  return `${toCSSProperty(property)}: ${toCSSValue(value)};`
}
