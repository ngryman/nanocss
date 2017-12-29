import reduce from './reduce'
import ruleReducerWith from './rule-reducer-with'

export default function reduceRuleWith(stringAppender) {
  return function reduceRule(rule, props, isDynamic) {
    const reducer = ruleReducerWith(props, stringAppender, isDynamic)
    return reduce(rule, reducer)
  }
}
