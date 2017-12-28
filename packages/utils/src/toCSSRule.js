export default function toCSSRule(selector, declarations) {
  return `${selector} { ${declarations} }`
}
