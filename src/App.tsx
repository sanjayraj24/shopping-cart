import Products from './components/Products'
import Basket from './components/Basket'
import useFirebaseSync from './hooks/useFirebaseSync'

export default function App() {
  useFirebaseSync()

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 border-l-4 border-indigo-500 pl-4">
          <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add products on the left — your basket stays on the right.
          </p>
        </header>

        <main className="flex gap-4 sm:gap-5">
          <div className="min-w-0 flex-1">
            <Products />
          </div>
          <div className="w-[44%] shrink-0 sm:w-[38%]">
            <Basket />
          </div>
        </main>
      </div>
    </div>
  )
}
