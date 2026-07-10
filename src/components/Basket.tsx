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
    <section className="card sticky-top">
      <div className="card-header d-flex justify-content-between align-items-center bg-white">
        <h2 className="mb-0 small fw-semibold text-success">Basket</h2>
        {hasItems && (
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="btn btn-outline-danger btn-sm"
          >
            Clear all
          </button>
        )}
      </div>

      {bill.items.length === 0 ? (
        <p className="p-4 text-center small text-muted">No items yet.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush" style={{maxHeight: '55vh', overflowY: 'auto'}}>
            {bill.items.map((item) => (
              <BasketItem key={item.productId} item={item} />
            ))}
          </ul>

          <div className="card-body small bg-light border-top">
            <div className="d-flex justify-content-between text-muted">
              <span>Sub total</span>
              <span>{formatMoney(bill.subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between text-success">
              <span>Savings</span>
              <span>{formatMoney(bill.totalSavings)}</span>
            </div>
            <div className="d-flex justify-content-between bg-white p-2 fw-semibold mt-2">
              <span>Total</span>
              <span>{formatMoney(bill.total)}</span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
