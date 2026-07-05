import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../store/cartSlice'
import { loadBasket, saveBasket } from '../firebase/saveBasket'
import type { RootState } from '../store/store'
import type { AppDispatch } from '../store/store'

export default function useFirebaseSync() {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  useEffect(() => {
    loadBasket().then((savedCart) => {
      if (savedCart) {
        dispatch(setCart(savedCart))
      }
    })
  }, [dispatch])

  useEffect(() => {
    saveBasket(cartItems)
  }, [cartItems])
}
