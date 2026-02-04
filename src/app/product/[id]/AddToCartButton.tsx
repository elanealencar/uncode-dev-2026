"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/store/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  const disabled = product.stock <= 0;

  return (
    <button
      type="button"
      data-testid="add-to-cart"
      onClick={() => addItem(product, 1)}
      disabled={disabled}
      aria-disabled={disabled}
      className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold cursor-pointer text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? "Indisponível" : "Adicionar ao carrinho"}
    </button>
  );
}
