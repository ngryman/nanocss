export default function createStringAppender(separator = ' ') {
  return function appendString(string1, string2) {
    if (!string1) return string2
    return (string1 + (string2 ? separator + string2 : ''))
  }
}
