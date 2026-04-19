import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

const SERVICES_TABLE = 'services';

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

    // Actualizar cada servicio con su nuevo orden
    const updatesPromises = data.updates.map((update: { id: string; orden: number }) =>
      supabase
        .from(SERVICES_TABLE)
        .update({ orden: update.orden })
        .eq('id', update.id)
    );

    const results = await Promise.all(updatesPromises);
    const errors = results.filter(r => r.error);
    
    if (errors.length > 0) {
      console.error('Errors in reorder:', errors);
      return NextResponse.json(
        { success: false, message: 'Error al actualizar orden', details: errors[0].error },
        { status: 500 }
      );
    }
    
    // Obtener todos los servicios actualizados
    const { data: services, error: fetchError } = await supabase
      .from(SERVICES_TABLE)
      .select('*');

    if (fetchError) {
      return NextResponse.json(
        { success: false, message: 'Error al obtener servicios', details: fetchError },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Orden actualizado correctamente',
      services
    });
  } catch (error) {
    console.error('Error al reordenar servicios:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar el orden', details: String(error) },
      { status: 500 }
    );
  }
}
