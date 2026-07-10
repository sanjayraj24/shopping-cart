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
    <section className="card">
      <div className="card-header bg-light">
        <h2 className="mb-0 small fw-semibold">Products</h2>
      </div>
      <ul className="list-group list-group-flush">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}
