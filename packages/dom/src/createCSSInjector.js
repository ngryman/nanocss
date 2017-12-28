const createStyleSheet = () => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(''))

  document.head.appendChild(style)

  return style.sheet
}

export default function createCSSInjector() {
  const styleSheet = createStyleSheet()

  return function injectCSSRule(rule) {
    styleSheet.insertRule(rule)
  }
}
