import { NextResponse } from "next/server";
import { addProduct, getAllProducts, deleteProduct } from "@/utils/productsFirestore";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newProduct = await addProduct(data);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
