import { Entity } from '../base-classes/entity.base'

export interface IRepository<Props, T extends Entity<Props>> {
  create(data: T): Promise<void>
  update(data: T): Promise<void>
  delete(id: string): Promise<void>
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
}

export type SortDirection = 'asc' | 'desc'

export class SearchProps<Filter = string> {
  page?: number
  per_page?: number
  sort?: string
  sort_dir?: SortDirection
  filter?: Filter
}

export class SearchParams {
  protected _page: number
  protected _per_page = 15
  protected _sort: string | null
  protected _sort_dir: SortDirection | null
  protected _filter: string | null

  constructor(props: SearchProps = {}) {
    this.page = props.page || 1
    this.per_page = props.per_page || 15
    this.sort = props.sort || null
    this.sort_dir = props.sort_dir || null
    this.filter = props.filter || null
  }
  get page(): number {
    return this._page
  }
  get per_page(): number {
    return this._per_page
  }
  get sort(): string | null {
    return this._sort
  }
  get sort_dir(): SortDirection | null {
    return this._sort_dir
  }
  get filter(): string | null {
    return this._filter
  }

  private set page(value: number) {
    let _page = Number(value)
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1
    }
    this._page = _page
  }

  private set per_page(value: number) {
    let _per_page = value === (true as any) ? this._per_page : Number(value)

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    ) {
      _per_page = 15
    }
    this._per_page = _per_page
  }

  private set sort(value: string | null) {
    let _sort = String(value)
    if (value === null || value === undefined || value === '') {
      _sort = null
    }
    this._sort = _sort
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this._sort_dir = null
      return
    }
    const dir = `${value}`.toLowerCase()
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir
  }

  private set filter(value: string | null) {
    let _filter = String(value)
    if (value === null || value === undefined || value === '') {
      _filter = null
    }
    this._filter = _filter
  }
}

export type SearchResultProps<Props, E extends Entity<Props>, Filter> = {
  items: E[]
  total: number
  current_page: number
  per_page: number
  sort: string | null
  sort_dir: SortDirection | null
  filter: Filter
}

export class SearchResult<Props, E extends Entity<Props>, Filter = string> {
  readonly items: E[]
  readonly total: number
  readonly current_page: number
  readonly per_page: number
  readonly last_page: number
  readonly sort: string | null
  readonly sort_dir: SortDirection | null
  readonly filter: Filter | null

  constructor(props: SearchResultProps<Props, E, Filter>) {
    this.items = props.items
    this.total = props.total
    this.current_page = props.current_page
    this.per_page = props.per_page
    this.last_page = Math.ceil(this.total / this.per_page)
    this.sort = props.sort
    this.sort_dir = props.sort_dir
    this.filter = props.filter
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter
    }
  }
}
export interface ISearchableRepository<
  Props,
  T extends Entity<Props>,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<Props, T>
> extends IRepository<Props, T> {
  searchbableFields: string[]
  search(props: SearchParams): Promise<SearchOutput>
}
