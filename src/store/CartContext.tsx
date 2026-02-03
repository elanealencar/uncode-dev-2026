"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;

  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "uncode_cart_v1";

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore corrupted storage
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((v) => !v);

  const addItem = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (!existing) {
        const q = clamp(quantity, 1, product.stock);
        return [...prev, { product, quantity: q }];
      }

      const nextQty = clamp(existing.quantity + quantity, 1, product.stock);
      return prev.map((i) =>
        i.product.id === product.id ? { ...i, quantity: nextQty } : i
      );
    });

    openCart();
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const setQuantity = (productId: number, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id !== productId) return i;
          const q = clamp(quantity, 1, i.product.stock);
          return { ...i, quantity: q };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const increase = (productId: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId) return i;
        const q = clamp(i.quantity + 1, 1, i.product.stock);
        return { ...i, quantity: q };
      })
    );
  };

  const decrease = (productId: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id !== productId) return i;
          const q = i.quantity - 1;
          return { ...i, quantity: q };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, cur) => acc + cur.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    increase,
    decrease,
    setQuantity,
    clear,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
