import { Category } from 'src/modules/category/entities'
import { Product } from 'src/modules/product/entities'

export type SupplierProps = {
  name: string
  email: string
  phones: string[]
  address: string
  isActive: boolean
  description?: string
  extraInfo?: any
  isBlocked: boolean
  cnpj: string
  products?: Product[]
  category?: Category
  categoryId: string
}
