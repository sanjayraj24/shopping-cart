import type { Product } from '../types'

export const products: Product[] = [
  { id: 'bread', name: 'Bread', price: 110 },
  { id: 'milk', name: 'Milk', price: 50 },
  { id: 'cheese', name: 'Cheese', price: 90 },
  { id: 'soup', name: 'Soup', price: 60 },
  { id: 'butter', name: 'Butter', price: 120 },
]

export function getProduct(id: string): Product {
  // fallback if not found — return a minimal product
  return products.find((p) => p.id === id) as Product
}
