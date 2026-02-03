import ProductsExplorer from "@/components/ProductsExplorer";
import { getProducts } from "@/lib/products";

/* Alternativa (via API)
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
*/

export default async function HomePage() {
  const products = await getProducts();

  // Alternativa (via API):
  // const res = await fetch("/api/products", { cache: "no-store" });
  // const products = await res.json();

  return (
    <div>
      <h1 className="text-3xl font-bold">Produtos Dev</h1>
      <p className="mt-1 text-neutral-600">
        Escolha seus itens favoritos e incremente a sua jornada dev!
      </p>

      <div className="mt-6">
        <ProductsExplorer products={products} />
      </div>
    </div>
  );
}
