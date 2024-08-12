import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { budgetRouter } from './routes/budget'
import { expenseRouter } from './routes/expense'
import { UserRouter } from './routes/user'
import { budgetExpenseRouter } from './routes/budgetexpenses'

const app = new Hono()

app.use("/*", cors())

app.route("api/v1/user", UserRouter)
app.route("api/v1/budgets", budgetRouter)
app.route("api/v1/expenses", expenseRouter)
app.route("api/v1/budgetexpenses",budgetExpenseRouter)

export default app


