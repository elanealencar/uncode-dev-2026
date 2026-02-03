import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return NextResponse.json({ message: "Id inválido" }, { status: 400 });
  }

  const product = await getProductById(productId);

  if (!product) {
    return NextResponse.json(
      { message: "Produto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}