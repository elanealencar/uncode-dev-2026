"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/store/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product, 1)}
      disabled={product.stock <= 0}
      className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {product.stock > 0 ? "Adicionar ao carrinho" : "Indisponível"}
    </button>
  );
}
