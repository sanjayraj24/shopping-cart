import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { formatMoney } from '../utils/formatMoney'
import type { Product } from '../types'
import type { AppDispatch } from '../store/store'

export default function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <p className="mb-0 fw-medium text-dark">{product.name}</p>
        <p className="mb-0 small text-primary">{formatMoney(product.price)}</p>
      </div>
      <button
        type="button"
        onClick={() => dispatch(addItem(product.id))}
        className="btn btn-primary btn-sm"
      >
        Add
      </button>
    </li>
  )
}
