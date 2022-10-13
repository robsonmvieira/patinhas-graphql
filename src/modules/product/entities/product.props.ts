import { Category } from 'src/modules/category/entities'
import { Supplier } from 'src/modules/supplier/entities'

export type ProductProps = {
  title: string
  brand: string
  barCode: string
  categoryId: string
  supplierId: string
  sku: string
  price: number
  // unit?: string

  quantity: number
  currentPrice: number
  isActive: boolean

  category?: Category
  supplier?: Supplier

  color?: string
  extraInfo?: any
  images?: string[]
  capacity?: string
  isPrime?: boolean
  fromPrice?: number
  technicalInfo?: any
  portsNumber?: number
  description?: string
  voltage?: '110V' | '220V'
  betterPriceFromBeforeLastMonth: boolean
}
