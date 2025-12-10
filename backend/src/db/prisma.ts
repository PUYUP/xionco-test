import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";
import { ProductCreateSchema } from "../schemas/product";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter }).$extends({
    query: {
        product: {
            create({ args, query }) {
                args.data = ProductCreateSchema.parse(args.data)
                return query(args)
            },
            update({ args, query }) {
                args.data = ProductCreateSchema.parse(args.data)
                return query(args)
            },
        }
    }
});

export { prisma };