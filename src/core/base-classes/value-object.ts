export abstract class ValueObject<T = any> {
  protected readonly _value: T
  constructor(value: T) {
    this._value = Object.freeze(value)
  }

  equals(id?: ValueObject<T>): boolean {
    if (id === null || id === undefined) {
      return false
    }
    if (!(id instanceof this.constructor)) {
      return false
    }
    return id.value === this.value
  }

  get value(): T {
    return this._value
  }

  toString(): string {
    return String(this.value)
  }

  // toString = () => {
  //   if (typeof this.value !== 'object' || this.value === null) {
  //     try {
  //       return this.value.toString()
  //     } catch (error) {
  //       return this.value + ''
  //     }
  //   }
  //   const valueStr = this.value.toString();
  //   return valueStr === '[object Object]' ? JSON.stringify(this.value) : valueStr;
  // }

 
}
