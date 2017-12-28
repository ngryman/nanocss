import reduce from './reduce'
import ruleReducer from './ruleReducer'
import stringAggregator from './stringAggregator'

const aggregateDeclaration = stringAggregator('')

const uniqueKeyFor = (rule, props, isDynamic) => {
  return reduce(
    rule,
    ruleReducer(props, aggregateDeclaration, isDynamic)
  )
}

export default uniqueKeyFor
