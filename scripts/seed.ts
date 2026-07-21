import "dotenv/config";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("Password@123", 10);

  // Create Workspace
  const workspace = await prisma.workspace.upsert({
    where: {
      slug: "loop-demo",
    },
    update: {},
    create: {
      name: "LOOP Demo Workspace",
      slug: "loop-demo",
    },
  });

  // Admin
  await prisma.user.upsert({
    where: {
      email: "admin@loop.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@loop.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      workspaceId: workspace.id,
    },
  });

  // Analyst
  await prisma.user.upsert({
    where: {
      email: "analyst@loop.com",
    },
    update: {},
    create: {
      name: "Analyst",
      email: "analyst@loop.com",
      password: hashedPassword,
      role: UserRole.ANALYST,
      workspaceId: workspace.id,
    },
  });

  // Viewer
  await prisma.user.upsert({
    where: {
      email: "viewer@loop.com",
    },
    update: {},
    create: {
      name: "Viewer",
      email: "viewer@loop.com",
      password: hashedPassword,
      role: UserRole.VIEWER,
      workspaceId: workspace.id,
    },
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });