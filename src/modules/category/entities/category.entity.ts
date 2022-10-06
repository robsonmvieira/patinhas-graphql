import { AggregateRoot } from 'src/core/base-classes/aggregate-root.entity'
import { Result } from 'src/core/base-classes/result'
import { ValidatorRules } from 'src/core/validators/validator-rules'
import { UniqueID } from 'src/core/value-objects/ID.vo'
import { CategoryProps } from './category.props'

export class Category extends AggregateRoot<CategoryProps> {
  private constructor(readonly props: CategoryProps, id?: UniqueID) {
    super(props, id)
  }

  public static create(data: CategoryProps, id?: UniqueID): Result<Category> {
    const payload: CategoryProps = {
      name: data.name,
      description: data.description,
      isActive: data.isActive
    }
    Category.validate(payload)
    return Result.ok(new Category(payload, id))
  }

  // public static validate(data: CategoryProps):void {
  //   ValidatorRules.values(data.name, 'name').required().string();
  //   ValidatorRules.values(data.description, 'description').string();
  //   ValidatorRules.values(data.isActive, 'isActive').boolean();
  // }
  public static validate(data: CategoryProps): void {
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

  updateName(name: string): void {
    ValidatorRules.values(name, 'name').required().string()
    this.props.name = name
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
    return this.props.name
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
