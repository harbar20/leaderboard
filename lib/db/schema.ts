import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  score: integer("score").notNull().default(0),
})

export type Team = typeof teams.$inferSelect
export type NewTeam = typeof teams.$inferInsert

