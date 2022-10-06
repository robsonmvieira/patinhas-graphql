export class Result<T> {
  public readonly isSuccess: boolean
  public readonly isFailure: boolean
  public error: T | string
  private _value: T

  constructor(isSuccess: boolean, error?: T | string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error('Result: cannot be both a success and a failure')
    }

    if (!isSuccess && !error) {
      throw new Error('Result: must be either a success or a failure')
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error as T
    this._value = value as T

    Object.freeze(this)
  }

  public getResult(): T {
    if (!this.isSuccess) {
      console.log(this.error)
      throw new Error(
        'Can not get the value of an error result. Use errorValue instead.'
      )
    }

    return this._value
  }

  public errorValue(): T {
    return this.error as T
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result
    }
    return Result.ok()
  }
}
