import reduceRuleWith from './reduce-rule-with'
import toCSSDeclaration from './to-css-declaration'

const toCSSDeclarations = reduceRuleWith(toCSSDeclaration)

export default toCSSDeclarations
