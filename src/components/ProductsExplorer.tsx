"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function ProductsExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("relevance");
  
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    let list = products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesCategory = category === "all" ? true : p.category === category;

      return matchesQuery && matchesCategory;
    });

    // ordenação
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

    return list;
  }, [products, query, category, sort]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSort("relevance");
  }

  return (
    <section className="space-y-4 mt-4">
      {/* Toolbar */}
      <div className="rounded-2xl bg-white p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou descrição"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            />
          </div>

          <div>
            <label htmlFor="category" className="sr-only">
              Filtrar por categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Todas as categorias" : c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="sr-only">
              Ordenar produtos
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            >
              <option value="relevance">Ordenar: relevância</option>
              <option value="price-asc">Preço: menor → maior</option>
              <option value="price-desc">Preço: maior → menor</option>
              <option value="name-asc">Nome: A → Z</option>
              <option value="name-desc">Nome: Z → A</option>
            </select>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="md:col-span-2 flex items-end justify-between gap-3">
            <p className="text-sm text-neutral-600">
              {filtered.length} {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-neutral-50"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          Nenhum produto encontrado com os filtros atuais.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
