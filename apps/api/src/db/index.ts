import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import * as schema from '../db/schema.js';

const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(poolConnection, { schema, mode: 'default' });