import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password"), // nullable for oauth users
  provider: text("provider").default("credentials"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Other tables as previously defined...
