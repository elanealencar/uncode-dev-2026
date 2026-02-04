"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Header() {
  const { totalItems, toggleCart } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-[#f8f7f3] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between py-3 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-32 overflow-hidden">
              <Image
                src="/logoUncode.jpeg"
                alt="Uncode"
                fill
                className="object-contain"
                priority
              />
            </div>       
          </Link>

          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 cursor-pointer rounded-xl border-2 border-orange-400 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={20}/>
            <span>Carrinho</span>
            {totalItems > 0 && (
              <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
