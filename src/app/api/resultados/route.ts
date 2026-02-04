import { NextResponse } from "next/server";
import { addResultado, getAllResultados, deleteResultado, updateResultado } from "@/utils/resultadosSupabase";
export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...rest } = data;
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });
  await updateResultado(id, rest);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const resultados = await getAllResultados();
  return NextResponse.json(resultados);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newResultado = await addResultado(data);
  return NextResponse.json(newResultado);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });
  await deleteResultado(id);
  return NextResponse.json({ success: true });
}
