import { useDispatch } from 'react-redux'
import { increaseQty, decreaseQty } from '../store/cartSlice'
import { formatMoney } from '../utils/formatMoney'
import type { BillItem } from '../types'
import type { AppDispatch } from '../store/store'

export default function BasketItem({ item }: { item: BillItem }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <li className="px-3 py-3 text-sm transition-colors hover:bg-emerald-50/40 sm:px-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-slate-800">{item.name}</p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => dispatch(decreaseQty(item.productId))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
            aria-label={`Decrease ${item.name}`}
          >
            -
          </button>
          <span className="min-w-[18px] text-center font-medium">{item.qty}</span>
          <button
            type="button"
            onClick={() => dispatch(increaseQty(item.productId))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
            aria-label={`Increase ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-1.5 text-slate-500">Unit price: {formatMoney(item.unitPrice)}</p>
      <p className="text-slate-500">
        {formatMoney(item.unitPrice)} x {item.qty} = {formatMoney(item.lineSubtotal)}
      </p>
      {item.saving > 0 && (
        <p className="font-medium text-emerald-600">Saving: {formatMoney(item.saving)}</p>
      )}
      <p className="font-medium text-slate-700">Cost: {formatMoney(item.lineTotal)}</p>
    </li>
  )
}
