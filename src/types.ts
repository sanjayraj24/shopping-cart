export interface Product {
  id: string
  name: string
  price: number
}

export interface Offer {
  id: string
  label: string
}

export type CartItems = Record<string, number>

export interface BillItem {
  productId: string
  name: string
  qty: number
  unitPrice: number
  lineSubtotal: number
  saving: number
  lineTotal: number
}

export interface BillResult {
  subtotal: number
  appliedOffers: Array<{ label: string; saving: number }>
  totalSavings: number
  total: number
  items: BillItem[]
}
