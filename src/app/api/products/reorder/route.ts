import { NextResponse } from "next/server";
import { reorderProducts } from "@/utils/productsSupabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Validar que venga el array de updates
    if (!data.updates || !Array.isArray(data.updates)) {
      return NextResponse.json(
        { success: false, message: 'Se requiere un array de updates' },
        { status: 400 }
      );
    }

    // Llamar a la función de reordenamiento
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
