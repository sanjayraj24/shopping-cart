import { collection, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import type { Product } from '../types'

export async function getProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured()) {
    const mod = await import('../data/products')
    return (mod as any).products
  }

  try {
    const snapshot = await getDocs(collection(db, 'products'))
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Product) }))
  } catch (err: any) {
    console.warn('Could not fetch products from Firestore:', err.message)
    const mod = await import('../data/products')
    return (mod as any).products
  }
}

export async function getOffers() {
  if (!isFirebaseConfigured()) {
    const mod = await import('../data/offers')
    return (mod as any).offers
  }

  try {
    const snapshot = await getDocs(collection(db, 'offers'))
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
  } catch (err: any) {
    console.warn('Could not fetch offers from Firestore:', err.message)
    const mod = await import('../data/offers')
    return (mod as any).offers
  }
}
