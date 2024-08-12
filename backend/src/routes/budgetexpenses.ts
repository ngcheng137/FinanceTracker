import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const budgetExpenseRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

budgetExpenseRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("jwtPayload", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in catch",
    });
  }
});

budgetExpenseRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const budgetExpense = await prisma.budgetExpenses.create({
    data: {
      amount: body.amount,
      date: body.date,
      description: body.description,
      budgetId: body.budgetId,
      userId: c.get("jwtPayload"),
    },
  });
  await prisma.expenses.create({
    data: {
      amount: body.amount,
      date: body.date,
      description: body.description,
      budgetName: body.budgetName,
      userId: c.get("jwtPayload"),
      budgetExpenseId: budgetExpense.id,
    },
  });

  return c.json(budgetExpense);
});

budgetExpenseRouter.delete("/:id", async (c) => {
  const { id } = c.req.param();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  await prisma.expenses.deleteMany({
    where: { budgetExpenseId: Number(id) },
  });  

  const budgetExpense = await prisma.budgetExpenses.delete({
    where: { id: Number(id) },
  });
  return c.json({ message: 'Budget expense deleted', budgetExpense });
});

budgetExpenseRouter.get("/:budgetId", async (c) => {
  const { budgetId } = c.req.param();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const budgetExpenses = await prisma.budgetExpenses.findMany({
    where: { budgetId: Number(budgetId) },
  });
  return c.json(budgetExpenses);
});

budgetExpenseRouter.get("/:budgetId/:expenseId", async (c) => {
  const { budgetId, expenseId } = c.req.param();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const budgetExpense = await prisma.budgetExpenses.findFirst({
    where: { id: Number(expenseId), budgetId: Number(budgetId) },
  });

  if (!budgetExpense) {
    return c.status(404);
  }
  return c.json(budgetExpense);
});
