import { Hono } from "hono"
import { verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const budgetRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();
 
budgetRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            c.set('jwtPayload', user.id);
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
});

budgetRouter.post("/",async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const budget = await prisma.budget.create({
        data: {
            name: body.name,
            amount: body.amount,
            period: body.period,
            userId: c.get("jwtPayload")
        }
    })
    return c.json(budget)
})

budgetRouter.put("/:id",async (c) => {
    const { id } = c.req.param();
    const { amount, period } = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const budget = await prisma.budget.update({
        where: { id: Number(id) },
        data: { amount, period },
      });
      return c.json(budget);
})

budgetRouter.get("/:userId",async (c) => {
    const { userId } = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const budget = await prisma.budget.findMany({
      where: { userId: Number(userId) },
    });
    return c.json(budget);

})

budgetRouter.get("/find/:id", async (c) => {
    const { id } = c.req.param();
    const userId = c.get("jwtPayload");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const budget = await prisma.budget.findFirst({
        where: {
            id: Number(id),
            userId: Number(userId)
        }
    });

    if (budget) {
        return c.json(budget);
    } else {
        c.status(404);
        return c.json({ message: "Budget not found or not authorized" });
    }
});

budgetRouter.delete("/:id", async (c) => {
    const { id } = c.req.param();
    const userId = c.get("jwtPayload");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const budget = await prisma.budget.findFirst({
        where: {
            id: Number(id),
            userId: Number(userId),
        },
    });

    if (!budget) {
        c.status(404);
        return c.json({ message: "Budget not found or not authorized" });
    }

    await prisma.budgetExpenses.deleteMany({
        where: { budgetId: Number(id) },
    });
    
    const response = await prisma.budget.delete({
        where: {
            id: Number(id),
        },
    });
    return c.json({ message: "Budget deleted successfully" , response});
});