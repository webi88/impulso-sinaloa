import { NextResponse } from "next/server";
import { posts } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: "Artículo recibido", data: body });
  } catch {
    return NextResponse.json({ error: "Error al procesar el artículo" }, { status: 400 });
  }
}
