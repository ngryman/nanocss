import { hash } from 'nanocss-utils'

class TemplatePart {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
}

class VClass {
  constructor() {
    this.staticRules = ''
    this.variableRules = []
  }
}

const vclasses = new Map()

const parseVClass = (strings, interpolations) =>
  strings.reduce((vclass, chunk, i) => {
    const lastRuleIndex = chunk.lastIndexOf(';')
    const staticRules = chunk.slice(0, lastRuleIndex).replace(/\n\s*/g, '')
    const variableRuleName = chunk.slice(lastRuleIndex + 1).replace(/[\n:]\s*/g, '')
    vclass.staticRules += staticRules
    if (variableRuleName) {
      vclass.variableRules.push(new TemplatePart(
        variableRuleName,
        interpolations[i]
      ))
    }
    return vclass
  }, new VClass())

const cssdyn = (strings, ...interpolations) => {
  const key = strings.join('')
  let template = vclasses.get(key)
  if (!template) {
    template = parseVClass(strings, interpolations)
  }
  return template
}

const Title = cssdyn`
  padding: 2em 1em;
  fontSize: 2rem;
  color: ${props => props.color || 'inherit'};
  background: transparent;
  border-color: ${props => props.color || 'inherit'};
`

const renderTemplatePart = (part, props) =>
  `${part.name}: ${part.value(props)};`

const renderTemplateParts = (template, props) =>
  template.variableRules.reduce((res, part) =>
    res + renderTemplatePart(part, props)
  , '')

const res = renderTemplateParts(Title, { color: 'red' })

const btoa = (typeof window !== 'undefined' && window.btoa) || function btoa(str) {
  if (Buffer.byteLength(str) !== str.length)
    throw new Error('bad string!');
  return Buffer(str, 'binary').toString('base64');
}

const classes = new Map()

const rulesSet = new Set()
let nextClassId = 1

const getClassId = () => btoa(String(nextClassId++))

const reconcileStylesheet = (res) => {
  if (!rulesSet.has(res)) {
    const classId = getClassId()
    classes.set(classId, res)
    rulesSet.add(res)
  }
}

reconcileStylesheet(res)
reconcileStylesheet(renderTemplateParts(Title, { color: 'yellow' }))
reconcileStylesheet(renderTemplateParts(Title, { color: 'red' }))
console.log(classes)

