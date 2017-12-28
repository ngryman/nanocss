export default function(selector, name, value) {
  // we might want to check if that DeclarationData class makes such a difference
  return new Declaration(name, new DeclarationValue(value))
}

class DeclarationValue {
  constructor(value) {
    this.value = value
  }

  valueOf() {
    return this.value
  }
}

class Rule {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
}


