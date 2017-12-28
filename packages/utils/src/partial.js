const partial = (fn, ...initialArgs) => {
  return (...args) => {
    return fn.apply(null, [...initialArgs, ...args])
  }
}

export default partial
