import {
  appendStringWith,
  getCacheKey,
  reduceRuleWith
} from '@nanocss/utils'
import {
  CSSSelectorGenerator,
  toCSSDeclarations,
  toCSSRule
} from '@nanocss/utils/css'

import DOMInjector from './dom-injector'

const appendWithSpace = appendStringWith(' ')

export default function createRenderer() {
  const cache = new Map()
  const generateCSSSelector = CSSSelectorGenerator()
  const injectToDOM = DOMInjector()

  const renderRule = (rule, props, isDynamic) => {
    const cacheKey = getCacheKey(rule, props, isDynamic)
    if (!cacheKey) return ''

    const cachedSelector = cache.get(cacheKey)
    if (cachedSelector) return cachedSelector

    const declarations = toCSSDeclarations(rule, props, isDynamic)
    const selector = generateCSSSelector()
    const cssRule = toCSSRule(selector, declarations)

    injectToDOM(cssRule)
    cache.set(cacheKey, selector)

    return selector
  }

  return function render(rule, props = {}) {
    const staticSelector = renderRule(rule, props, false)
    const dynamicSelector = renderRule(rule, props, true)

    return appendWithSpace(staticSelector, dynamicSelector)
  }
}
