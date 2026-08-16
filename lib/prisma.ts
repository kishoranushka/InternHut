import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

// Reuse a single PrismaClient across hot reloads in development so we don't
// exhaust Postgres connections every time a file changes.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Vercel's env var injection has been observed to prepend a stray UTF-8 BOM
// (U+FEFF) to values, which silently breaks URL parsing in the pg driver.
function stripBom(value: string | undefined) {
  return value?.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: stripBom(process.env.DATABASE_URL) });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
