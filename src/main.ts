import db from "./drizzle/db"
import dotenv from 'dotenv'

async function bootstrap() {
    dotenv.config()

   const users = await db.query.users.findMany()

   console.log(users)


}

bootstrap()