import { PrismaClient, UserRole, FeedbackChannel } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Password123", 10);

  const workspace = await prisma.workspace.create({
    data: {
      name: "LOOP Demo Workspace",
      slug: "loop-demo",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@loop.com",
      password,
      role: UserRole.ADMIN,
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Analyst User",
      email: "analyst@loop.com",
      password,
      role: UserRole.ANALYST,
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Viewer User",
      email: "viewer@loop.com",
      password,
      role: UserRole.VIEWER,
      workspaceId: workspace.id,
    },
  });

  const theme = await prisma.theme.create({
    data: {
      name: "Performance",
      workspaceId: workspace.id,
    },
  });

  await prisma.feedback.create({
    data: {
      title: "Application is slow",
      content: "Dashboard takes too long to load.",
      channel: FeedbackChannel.MANUAL,
      workspaceId: workspace.id,
      themes: {
        create: {
          themeId: theme.id,
        },
      },
    },
  });

  console.log("✅ Demo data inserted");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });