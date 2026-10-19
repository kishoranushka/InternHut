import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

// Reuse a single PrismaClient across hot reloads in development so we don't
// exhaust Postgres connections every time a file changes.
// The class is stored too: after `prisma generate` the dev server reloads the
// generated module, so a cached client built from the old class would be
// missing new models (e.g. "Cannot read properties of undefined (reading
// 'findMany')"). A changed class means the cache is stale.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaClass?: typeof PrismaClient;
};

// Vercel's env var injection has been observed to prepend a stray UTF-8 BOM
// (U+FEFF) to values, which silently breaks URL parsing in the pg driver.
function stripBom(value: string | undefined) {
  return value?.charCodeAt(0) === 0xfeff ? value.slice(1) : value;
}

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: stripBom(process.env.DATABASE_URL) });
  return new PrismaClient({ adapter });
}

const cachedClient =
  globalForPrisma.prismaClass === PrismaClient ? globalForPrisma.prisma : undefined;
if (!cachedClient) void globalForPrisma.prisma?.$disconnect();

export const prisma = cachedClient ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaClass = PrismaClient;
}
