import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
