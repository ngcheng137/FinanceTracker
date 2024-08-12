import { Hono } from "hono"
import { verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const expenseRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
 
expenseRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            c.set("jwtPayload", user.id);
            await next();
        }else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in catch"
        })
    }
})

expenseRouter.post("/",async (c) => {
    const body = await c.req.json();
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const expense = await prisma.expenses.create({
      data: { 
        amount: body.amount,
        date: body.date,
        description: body.description,
        budgetName: body.budgetName,
        userId: c.get("jwtPayload"),
        budgetExpenseId: body.budgetExpenseId,
       },
    });
    return c.json(expense);
})

expenseRouter.put("/:id",async (c) => {
    const { id } = c.req.param();
    const { categoriesId, amount, date, description } = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const expense = await prisma.expenses.update({
      where: { id: Number(id) },
      data: { amount, date, description },
    });
    return c.json(expense);
})

expenseRouter.delete("/:id",async (c) => {
    const { id } = c.req.param();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const expense = await prisma.expenses.delete({
      where: { id: Number(id) },
    });
    return c.json({ message: 'Expense deleted', expense });
})

expenseRouter.get("/:userId",async (c) => {
    const { userId } = c.req.param();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const expenses = await prisma.expenses.findMany({
      where: { userId: Number(userId) },
    });
    return c.json(expenses);
})