import { db } from "./db"
import { teams, type Team, type NewTeam } from "./db/schema"
import { eq, desc } from "drizzle-orm"

export async function getLeaderboard(): Promise<Team[]> {
  return db.select().from(teams).orderBy(desc(teams.score))
}

export async function addTeam(newTeam: NewTeam): Promise<void> {
  await db.insert(teams).values(newTeam)
}

export async function updateTeam(id: number, updatedTeam: Partial<Team>): Promise<void> {
  await db.update(teams).set(updatedTeam).where(eq(teams.id, id))
}

export async function deleteTeam(id: number): Promise<void> {
  await db.delete(teams).where(eq(teams.id, id))
}

export {
    Team,
    NewTeam
}
