const RE_CAMELCASE = /\.?([A-Z])/g

const replacer = (_, c) => '-' + c.toLowerCase()

const toCSSProperty = (property) => {
  return property.replace(RE_CAMELCASE, replacer)
}

const toCSSValue = (value) => {
  return (typeof value === 'number' ? `${value}px` : value)
}

const toCSSDeclaration = (property, value) => {
  return `${toCSSProperty(property)}: ${toCSSValue(value)};`
}

export default toCSSDeclaration
