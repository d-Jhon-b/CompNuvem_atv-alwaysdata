import { mysqlTable,int,varchar,text } from "drizzle-orm/mysql-core"


export const produtos=mysqlTable('produtos',
    {
        id:int('id').primaryKey().autoincrement().notNull(),
        nome:varchar('nome', {length:255}).notNull().default('produto').notNull(),

    }
)