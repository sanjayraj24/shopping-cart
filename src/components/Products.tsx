import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { getProducts } from '../firebase/productService'
import type { Product } from '../types'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      const items = await getProducts()
      setProducts(items)
    }

    loadProducts()
  }, [])

  return (
    <section className="overflow-hidden rounded-lg border border-indigo-100 bg-white shadow-sm">
      <h2 className="border-b border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-800">
        Products
      </h2>
      <ul className="divide-y divide-slate-100">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}
