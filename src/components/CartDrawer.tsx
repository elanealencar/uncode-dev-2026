"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useCart } from "@/store/CartContext";
import { formatBRL } from "@/lib/format";
import { ShoppingCartIcon } from "lucide-react";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    totalPrice,
    increase,
    decrease,
    removeItem,
    clear,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={closeCart}
        className={[
          "fixed inset-0 z-60 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!isOpen}
      />

      <aside
        className={[
          // z alto e fixed ocupando a tela toda no mobile
          "fixed inset-y-0 right-0 z-70 h-dvh w-screen border-l bg-white shadow-xl transition-transform",
          // no md+ vira painel com largura limitada
          "md:w-105",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingCartIcon size={22} />
                <p className="text-lg font-semibold">Carrinho</p>
              </div>
              <p className="text-xs text-neutral-600">
                {items.length === 0 ? "Nenhum item" : "Revise seus itens"}
              </p>
            </div>

            <button
              onClick={closeCart}
              className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
              aria-label="Fechar carrinho"
            >
              Fechar
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="rounded-xl border bg-neutral-50 p-6 text-sm text-neutral-700">
                Seu carrinho está vazio. Adicione um produto :)
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.product.id} className="rounded-xl border p-3">
                    <div className="flex gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.product.name}</p>
                        <p className="text-sm text-neutral-600">
                          {formatBRL(item.product.price)}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrease(item.product.id)}
                              className="h-9 w-9 rounded-lg border text-lg hover:bg-neutral-50"
                              aria-label="Diminuir quantidade"
                            >
                              –
                            </button>

                            <span className="w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increase(item.product.id)}
                              className="h-9 w-9 rounded-lg border text-lg hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                              aria-label="Aumentar quantidade"
                              disabled={item.quantity >= item.product.stock}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Remover
                          </button>
                        </div>

                        {item.quantity >= item.product.stock && (
                          <p className="mt-2 text-xs text-amber-700">
                            Limite de estoque atingido ({item.product.stock})
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Total</p>
              <p className="text-lg font-semibold">{formatBRL(totalPrice)}</p>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={clear}
                disabled={items.length === 0}
                className="w-full rounded-xl border px-4 py-3 text-sm font-medium hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Limpar
              </button>

              <button
                disabled={items.length === 0}
                className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Finalizar
              </button>
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              (Checkout fictício — desafio técnico)
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
