import { Entity } from '../base-classes/entity.base'
import { NotFoundException } from '../expeptions'
import {
  IRepository,
  ISearchableRepository,
  SearchResult as SR,
  SearchParams as SP
} from './base.repository'

export abstract class InMemoryRepository<Props, T extends Entity<Props>>
  implements IRepository<Props, T>
{
  data: T[] = []

  async update(data: T): Promise<void> {
    await this.get(data.id)
    const index = this.data.findIndex(item => item.id === data.id)
    this.data[index] = data
  }
  async delete(id: string): Promise<void> {
    await this.get(id)
    this.data = this.data.filter(item => item.id !== id)
  }
  async findById(id: string): Promise<T> {
    return this.get(id)
  }
  async findAll(): Promise<T[]> {
    return this.data
  }

  async create(data: T): Promise<void> {
    this.data.push(data)
  }

  protected async get(id: string): Promise<T> {
    const result = this.data.find(item => item.id === id)

    if (!result) {
      throw new NotFoundException('Entity not found')
    }
    return result
  }
}

export abstract class InMemorySearchableRepository<
    Props,
    T extends Entity<Props>,
    SearchParams
  >
  extends InMemoryRepository<Props, T>
  implements ISearchableRepository<Props, T, SearchParams>
{
  searchbableFields: string[] = []
  async search(props: SP): Promise<SR<Props, T>> {
    const itemsFiltered = await this.applyFilter(this.data, props.filter)
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    )
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    )
    return new SR({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter
    })
  }
  protected abstract applyFilter(data: T[], filter: string | null): Promise<T[]>

  protected async applySort(
    data: T[],
    sort: string | null,
    sort_dir: string | null
  ): Promise<T[]> {
    if (!sort || !this.searchbableFields.includes(sort)) return data

    return [...data].sort((a, b) => {
      if (a.value[sort] < b.value[sort]) {
        return sort_dir === 'asc' ? -1 : 1
      }

      if (a.value[sort] > b.value[sort]) {
        return sort_dir === 'asc' ? 1 : -1
      }
      return 0
    })
  }
  protected async applyPaginate(
    data: T[],
    page: SP['page'],
    per_page: SP['per_page']
  ): Promise<T[]> {
    const start = (page - 1) * per_page
    const limit = start + per_page
    return data.slice(start, limit)
    return
  }
}
