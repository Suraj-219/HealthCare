import { PrismaClient } from "./generated/prisma";


export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: This global variable is used to persist the Prisma client instance
// across hot reloads in development mode. This approach prevents the creation of a new
// Prisma client instance with each application reload, which could otherwise cause issues
// related to database connections.