import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 as connected");
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const err = error as { message?: string; code?: string; meta?: unknown; cause?: unknown };
    return NextResponse.json({
      ok: false,
      message: err?.message,
      code: err?.code,
      meta: JSON.parse(JSON.stringify(err?.meta ?? null)),
      cause: JSON.parse(JSON.stringify(err?.cause ?? null)),
      nodeVersion: process.version,
      region: process.env.VERCEL_REGION ?? null,
    });
  }
}
