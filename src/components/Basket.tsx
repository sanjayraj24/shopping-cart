import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { calculateBill } from '../utils/calculateBill'
import { formatMoney } from '../utils/formatMoney'
import BasketItem from './BasketItem'
import type { RootState } from '../store/store'

export default function Basket() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const bill = calculateBill(cartItems)
  const hasItems = bill.items.length > 0

  return (
    <section className="sticky top-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-4 py-2.5">
        <h2 className="text-sm font-semibold text-emerald-800">Basket</h2>
        {hasItems && (
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50 active:scale-95"
          >
            Clear all
          </button>
        )}
      </div>

      {bill.items.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-slate-400">No items yet.</p>
      ) : (
        <>
          <ul className="max-h-[55vh] divide-y divide-slate-100 overflow-y-auto">
            {bill.items.map((item) => (
              <BasketItem key={item.productId} item={item} />
            ))}
          </ul>

          <div className="space-y-1.5 border-t border-emerald-100 bg-slate-50 px-4 py-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Sub total</span>
              <span>{formatMoney(bill.subtotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Savings</span>
              <span>{formatMoney(bill.totalSavings)}</span>
            </div>
            <div className="flex justify-between rounded-md bg-indigo-50 px-2 py-1.5 font-semibold text-indigo-900">
              <span>Total</span>
              <span>{formatMoney(bill.total)}</span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
