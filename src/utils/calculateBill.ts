import { getProduct } from '../data/products'
import { offers } from '../data/offers'
import type { CartItems, BillResult, BillItem } from '../types'

function emptyItemBreakdown(productId: string, qty: number): BillItem {
  const product = getProduct(productId)
  const lineSubtotal = product.price * qty

  return {
    productId,
    name: product.name,
    qty,
    unitPrice: product.price,
    lineSubtotal,
    saving: 0,
    lineTotal: lineSubtotal,
  }
}

function applyCheeseBogof(cart: CartItems, breakdown: Record<string, BillItem>, appliedOffers: Array<{ label: string; saving: number }>) {
  const qty = cart.cheese || 0
  if (qty < 2) return

  const freeCount = Math.floor(qty / 2)
  const saving = freeCount * getProduct('cheese').price
  const offer = offers.find((o) => o.id === 'cheese-bogof')

  if (!breakdown.cheese) return
  breakdown.cheese.saving += saving
  breakdown.cheese.lineTotal -= saving
  if (offer) appliedOffers.push({ label: offer.label, saving })
}

function applySoupBreadOffer(cart: CartItems, breakdown: Record<string, BillItem>, appliedOffers: Array<{ label: string; saving: number }>) {
  const soupQty = cart.soup || 0
  const breadQty = cart.bread || 0
  if (soupQty === 0 || breadQty === 0) return

  const discountedBreads = Math.min(soupQty, breadQty)
  const breadPrice = getProduct('bread').price
  const saving = discountedBreads * breadPrice * 0.5
  const offer = offers.find((o) => o.id === 'soup-bread')

  if (!breakdown.bread) return
  breakdown.bread.saving += saving
  breakdown.bread.lineTotal -= saving
  if (offer) appliedOffers.push({ label: offer.label, saving })
}

function applyButterDiscount(cart: CartItems, breakdown: Record<string, BillItem>, appliedOffers: Array<{ label: string; saving: number }>) {
  const qty = cart.butter || 0
  if (qty === 0) return

  const butterPrice = getProduct('butter').price
  const saving = Math.round(qty * butterPrice * (1 / 3))
  const offer = offers.find((o) => o.id === 'butter-third-off')

  if (!breakdown.butter) return
  breakdown.butter.saving += saving
  breakdown.butter.lineTotal -= saving
  if (offer) appliedOffers.push({ label: offer.label, saving })
}

export function calculateBill(cart: CartItems): BillResult {
  const appliedOffers: Array<{ label: string; saving: number }> = []
  const breakdown: Record<string, BillItem> = {}

  let subtotal = 0

  for (const productId in cart) {
    const qty = cart[productId]
    if (qty <= 0) continue

    breakdown[productId] = emptyItemBreakdown(productId, qty)
    subtotal += breakdown[productId].lineSubtotal
  }

  applyCheeseBogof(cart, breakdown, appliedOffers)
  applySoupBreadOffer(cart, breakdown, appliedOffers)
  applyButterDiscount(cart, breakdown, appliedOffers)

  const totalSavings = appliedOffers.reduce((sum, offer) => sum + offer.saving, 0)

  return {
    subtotal,
    appliedOffers,
    totalSavings,
    total: subtotal - totalSavings,
    items: Object.values(breakdown),
  }
}
