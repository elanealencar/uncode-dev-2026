import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { formatBRL } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) notFound();

  const product = await getProductById(productId);
  
  // Alternativa (via API, mantida como referência):
  // const res = await fetch(`/api/products/${params.id}`, { cache: "no-store" });
  // if (res.status === 404) return notFound();
  // const product = await res.json();

  if (!product) notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {product.category}
          </span>

          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-medium",
              product.stock > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700",
            ].join(" ")}
          >
            {product.stock > 0 ? `Em estoque (${product.stock})` : "Sem estoque"}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold">{product.name}</h1>
        <div className="mt-5 flex items-baseline justify-between gap-3">
          <p className="text-2xl font-bold">{formatBRL(product.price)}</p>
        </div>

        <div className="mt-5">
          <AddToCartButton product={product} />
          <p className="mt-5 text-md">{product.description}</p>
        </div>

        <div className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
          <p className="font-semibold">Dica</p>
          <p className="mt-1">
            Abra o carrinho pelo botão no topo e ajuste as quantidades em tempo real.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border mt-5 px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer"
            aria-label="Retornar para a página inicial"
            data-testid="retornar-home"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
