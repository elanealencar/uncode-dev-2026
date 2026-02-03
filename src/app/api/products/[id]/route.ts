import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Id inválido" }, { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
  }

  return NextResponse.json(product);
}