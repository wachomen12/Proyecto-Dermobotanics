import { NextResponse } from "next/server";
import { addService, getAllServices, deleteService, updateService } from "@/utils/servicesSupabase";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newService = await addService(data);
  return NextResponse.json(newService);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteService(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  await updateService(id, data);
  return NextResponse.json({ success: true });
}
