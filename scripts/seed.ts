import "dotenv/config";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  console.log("🌱 Resetting demo accounts...");

  // Delete existing demo users
  await prisma.user.deleteMany({
    where: {
      email: {
        in: [
          "admin@loop.com",
          "analyst@loop.com",
          "viewer@loop.com",
        ],
      },
    },
  });


  const password = await bcrypt.hash("123456", 10);


  // Workspace
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


  // ADMIN
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@loop.com",
      password,
      role: UserRole.ADMIN,
      workspaceId: workspace.id,
    },
  });


  // ANALYST
  await prisma.user.create({
    data: {
      name: "Analyst",
      email: "analyst@loop.com",
      password,
      role: UserRole.ANALYST,
      workspaceId: workspace.id,
    },
  });


  // VIEWER
  await prisma.user.create({
    data: {
      name: "Viewer",
      email: "viewer@loop.com",
      password,
      role: UserRole.VIEWER,
      workspaceId: workspace.id,
    },
  });


  console.log("✅ Demo users recreated");

  console.log(`
  ADMIN
  Email: admin@loop.com
  Password: 123456

  ANALYST
  Email: analyst@loop.com
  Password: 123456

  VIEWER
  Email: viewer@loop.com
  Password: 123456
  `);
}


main()
.catch((error)=>{
  console.error(error);
  process.exit(1);
})
.finally(async()=>{
  await prisma.$disconnect();
});