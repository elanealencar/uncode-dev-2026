import fs from "node:fs/promises";
import path from "node:path";
import { Product } from "@/types/product";

const productsPath = path.join(process.cwd(), "src", "data", "products.json");

export async function getProducts(): Promise<Product[]> {
  const file = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(file) as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}