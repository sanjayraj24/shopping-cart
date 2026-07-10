import { useDispatch } from 'react-redux'
import { increaseQty, decreaseQty } from '../store/cartSlice'
import { formatMoney } from '../utils/formatMoney'
import type { BillItem } from '../types'
import type { AppDispatch } from '../store/store'

export default function BasketItem({ item }: { item: BillItem }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0 fw-medium text-dark">{item.name}</p>
          <p className="mb-0 small text-muted">Unit price: {formatMoney(item.unitPrice)}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => dispatch(decreaseQty(item.productId))}
            className="btn btn-outline-secondary btn-sm"
            aria-label={`Decrease ${item.name}`}
          >
            -
          </button>
          <span className="px-2">{item.qty}</span>
          <button
            type="button"
            onClick={() => dispatch(increaseQty(item.productId))}
            className="btn btn-outline-secondary btn-sm"
            aria-label={`Increase ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-2 small text-muted">
        {formatMoney(item.unitPrice)} x {item.qty} = {formatMoney(item.lineSubtotal)}
      </div>
      {item.saving > 0 && (
        <p className="mb-0 small text-success">Saving: {formatMoney(item.saving)}</p>
      )}
      <p className="mb-0 fw-semibold">Cost: {formatMoney(item.lineTotal)}</p>
    </li>
  )
}
