import { SortDirection } from "../../../core/repository/base.repository"


export type ListPaginationResponse<Items> = {
  items: Items
  total: number
  current_page: number
  per_page: number
  sort: string | null
  sort_dir: SortDirection | null
  filter: string | null;
}