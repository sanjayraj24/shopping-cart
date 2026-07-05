import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import type { CartItems } from '../types'

function getDb() {
  if (!isFirebaseConfigured()) return null
  return db
}

const COLLECTION = 'baskets'
const DOC_ID = 'default'

export async function saveBasket(cartItems: CartItems) {
  const database = getDb()
  if (!database) return

  try {
    await setDoc(doc(database, COLLECTION, DOC_ID), { items: cartItems })
  } catch (error: any) {
    console.warn('Could not save basket to Firebase:', error.message)
  }
}

export async function loadBasket(): Promise<CartItems | null> {
  const database = getDb()
  if (!database) return null

  try {
    const snapshot = await getDoc(doc(database, COLLECTION, DOC_ID))
    if (snapshot.exists()) {
      return (snapshot.data() as any).items || null
    }
  } catch (error: any) {
    console.warn('Could not load basket from Firebase:', error.message)
  }

  return null
}
