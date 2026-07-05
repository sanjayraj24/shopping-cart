import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { formatMoney } from '../utils/formatMoney'
import type { Product } from '../types'
import type { AppDispatch } from '../store/store'

export default function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <li className="flex items-center justify-between gap-2 px-3 py-3 transition-colors hover:bg-indigo-50/60 sm:px-4">
      <div className="min-w-0">
        <p className="font-medium text-slate-800">{product.name}</p>
        <p className="text-sm font-medium text-indigo-600">{formatMoney(product.price)}</p>
      </div>
      <button
        type="button"
        onClick={() => dispatch(addItem(product.id))}
        className="shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md active:scale-95"
      >
        Add
      </button>
    </li>
  )
}
