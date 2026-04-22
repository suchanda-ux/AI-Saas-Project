import { PrismaClient } from "./generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
};

// @ts-ignore
const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;