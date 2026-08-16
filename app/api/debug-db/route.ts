import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const envInfo = {
    hasDatabaseUrl: !!dbUrl,
    databaseUrlLength: dbUrl?.length ?? 0,
    databaseUrlPrefix: dbUrl?.slice(0, 12) ?? null,
    databaseUrlHost: dbUrl ? dbUrl.split("@")[1]?.split("/")[0] : null,
  };
  try {
    const result = await prisma.$queryRawUnsafe("SELECT 1 as connected");
    return NextResponse.json({ ok: true, result, envInfo });
  } catch (error) {
    const err = error as { message?: string; code?: string; meta?: unknown; cause?: unknown };
    return NextResponse.json({
      ok: false,
      envInfo,
      message: err?.message,
      code: err?.code,
      meta: JSON.parse(JSON.stringify(err?.meta ?? null)),
      cause: JSON.parse(JSON.stringify(err?.cause ?? null)),
      nodeVersion: process.version,
      region: process.env.VERCEL_REGION ?? null,
    });
  }
}
