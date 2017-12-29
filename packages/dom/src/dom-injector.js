const createStyleSheet = () => {
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(''))

  document.head.appendChild(style)

  return style.sheet
}

export default function DOMInjector() {
  const styleSheet = createStyleSheet()

  return function injectToDOM(cssRule) {
    styleSheet.insertRule(cssRule)
  }
}
