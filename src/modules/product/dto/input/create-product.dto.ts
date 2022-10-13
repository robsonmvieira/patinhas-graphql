export class CreateSupplierDto {
  id: string
  title: string
  isActive: boolean
  sku: string
  barCode: string
  price: number
  currentPrice: number
  quantity: number
  brand: string
  // unit: string
  description: string
  supplierId: string
  categoryId: string
  images: string[]
  extraInfo: string
  color: string
  isPrime: boolean
  betterPriceFromBeforeLastMonth: boolean
  technicalInfo: string
}
