import appendStringWith from './append-string-with'
import reduceRuleWith from './reduce-rule-with'

const getCacheKey = reduceRuleWith(appendStringWith(' '))

export default getCacheKey
