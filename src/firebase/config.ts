import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app'
import { getAnalytics, Analytics } from 'firebase/analytics'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDbwOEeFF6A2ctdJdP9lsZwj5XdqOP1ADI',
  authDomain: 'shopping-cart-0101.firebaseapp.com',
  projectId: 'shopping-cart-0101',
  storageBucket: 'shopping-cart-0101.firebasestorage.app',
  messagingSenderId: '525584562593',
  appId: '1:525584562593:web:117287d4fca74a3feeb3e0',
  measurementId: 'G-V0Z5FV321B',
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
let analytics: Analytics | null = null
try {
  analytics = getAnalytics(app)
} catch (e) {
  // analytics may fail in non-browser environments
}

// Firestore database instance
const db: Firestore = getFirestore(app)

function isFirebaseConfigured(): boolean {
  return !!(firebaseConfig && firebaseConfig.projectId)
}

export { firebaseConfig, isFirebaseConfigured, app, db }
