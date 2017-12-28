import {
  createSelectorGenerator,
  partial,
  reduce,
  ruleReducer,
  stringAggregator,
  toCSSDeclaration,
  toCSSRule,
  uniqueKeyFor
} from '@nanocss/utils'

import createCSSInjector from './createCSSInjector'

export default function createRenderer() {
  const cache = new Map()
  const generateSelector = createSelectorGenerator()
  const injectCSSRule = createCSSInjector()

  const renderDeclarations = (rule, props, isDynamic) => {
    return reduce(
      rule,
      ruleReducer(props, toCSSDeclaration, isDynamic)
    )
  }

  const renderRule = (rule, props, isDynamic) => {
    const cacheKey = uniqueKeyFor(rule, props, isDynamic)
    if (!cacheKey) return ''

    const cachedSelector = cache.get(cacheKey)
    if (cachedSelector) return cachedSelector

    const declarations = renderDeclarations(rule, props, isDynamic)
    const selector = generateSelector()
    const cssRule = toCSSRule(selector, declarations)

    injectCSSRule(cssRule)

    cache.set(cacheKey, selector)

    return selector
  }

  return function render(rule, props = {}) {
    return reduce(
      [false, true],
      partial(renderRule, rule, props),
      stringAggregator(' ')
    )
  }
}
