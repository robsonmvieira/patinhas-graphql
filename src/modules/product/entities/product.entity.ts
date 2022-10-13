import { AggregateRoot } from 'src/core/base-classes/aggregate-root.entity'
import { Result } from 'src/core/base-classes/result'
import { ValidatorRules } from 'src/core/validators/validator-rules'
import { UniqueID } from 'src/core/value-objects/ID.vo'
import { ProductProps } from '.'

export class Product extends AggregateRoot<ProductProps> {
  private constructor(readonly props: ProductProps, id?: UniqueID) {
    super(props, id)
  }

  public static create(data: ProductProps, id?: UniqueID): Result<Product> {
    Product.validate({ ...data })
    return Result.ok(new Product({ ...data }, id))
  }

  // public static validate(data: ProductProps):void {
  //   ValidatorRules.values(data.name, 'name').required().string();
  //   ValidatorRules.values(data.description, 'description').string();
  //   ValidatorRules.values(data.isActive, 'isActive').boolean();
  // }
  public static validate(data: ProductProps): void {
    // todo validation
    // const validator = CategoryValidatorFactory.create()
    // const isValidresult = validator.validate(data)
    // if (!isValidresult) {
    //   throw new BadRequestException(
    //     'Invalid data was provided, please check the errors',
    //     validator.errors
    //   )
    // }
  }

  // title: string x
  // brand: string
  // isActive: boolean
  // description: string
  // currentPrice: number

  // color: string
  // extraInfo?: any
  // images: string[]
  // capacity?: string
  // isPrime?: boolean
  // fromPrice?: number
  // supplierId: string
  // technicalInfo?: any
  // portsNumber?: number
  // voltage?: '110V' | '220V'
  // betterPriceFromBeforeLastMonth?: boolean

  updateName(name: string): void {
    ValidatorRules.values(name, 'name').required().string()
    this.props.title = name
  }

  activate(): void {
    ValidatorRules.values(true, 'isActive').boolean()
    this.props.isActive = true
  }

  deactivate(): void {
    ValidatorRules.values(false, 'isActive').boolean()
    this.props.isActive = false
  }

  get name(): string {
    return this.props.title
  }
  get description(): string | undefined {
    return this.props?.description
  }

  get is_active(): boolean {
    return this._props.isActive
  }

  get created_at(): Date {
    return this.createdAt
  }
}
