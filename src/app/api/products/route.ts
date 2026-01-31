import { NextResponse } from "next/server";
import { addProduct, getAllProducts, deleteProduct, reorderProducts } from "@/utils/productsFirestore";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  // Si el body contiene 'updates', es una petición de reordenamiento
  if (data.updates) {
    try {
      const products = await reorderProducts(data.updates);
      return NextResponse.json({
        success: true,
        message: 'Orden actualizado correctamente',
        products
      });
    } catch (error) {
      console.error('Error al reordenar productos:', error);
      return NextResponse.json(
        { success: false, message: 'Error al actualizar el orden' },
        { status: 500 }
      );
    }
  }
  // Si no, es un alta normal de producto
  const newProduct = await addProduct(data);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
