import { mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const produtos = mysqlTable('produtos', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  descricao: varchar('descricao', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Produto = typeof produtos.$inferSelect;
export type NovoProduto = typeof produtos.$inferInsert;