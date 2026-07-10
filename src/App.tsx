import Products from './components/Products'
import Basket from './components/Basket'
import useFirebaseSync from './hooks/useFirebaseSync'

export default function App() {
  
  useFirebaseSync()

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{maxWidth: '900px'}}>
        <header className="mb-4 border-start border-3 border-primary ps-3">
          <h1 className="fs-4 fw-bold text-dark">Shopping Cart</h1>
          <p className="mt-1 small text-muted">Add products on the left — your basket stays on the right.</p>
        </header>

        <main className="row g-3">
          <div className="col-md-7">
            <Products />
          </div>
          <div className="col-md-5">
            <Basket />
          </div>
        </main>
      </div>
    </div>
  )
}
