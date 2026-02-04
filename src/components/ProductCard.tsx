import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatBRL } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-xl bg-gray-200 p-4 shadow-md transition hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 font-semibold">{product.name}</h3>
        <p className="mt-1 text-md text-neutral-600 font-bold">{formatBRL(product.price)}</p>
      </div>
    </Link>
  );
}
