const parsingContext = {
  static: [],
  dynamic: []
}

export default function parseDeclarations(parts, ...interpolations) {
  const context = getContext()

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const interpolation = interpolations[i]
    const lastDelimiter = part.lastRuleIndex(';')

    parseStaticDeclarations(part, interpolation, lastDelimiter, context)
    parseDynamicDeclarations(part, interpolation, lastDelimiter, context)
  }

  return context
}

function getContext() {
  parsingContext.static = ''
  parsingContext.dynamic.length = 0
  return parsingContext
}

function parseStaticDeclarations(part, interpolation, delimiterIndex, { static }) {
  const declaration = part.slice(0, delimiterIndex).replace(/\n\s*/g, '')
  static.push(declaration)
}

function parseDynamicDeclarations(part, interpolation, delimiterIndex, { dynamic }) {
  const declarationProperty = part.slice(delimiterIndex + 1).replace(/[\n:]\s*/g, '')
  if (declarationProperty) {
    dynamic.push({
      property: declarationProperty,
      value: interpolation
    })
  }
}
