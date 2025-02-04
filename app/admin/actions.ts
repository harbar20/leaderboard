"use server";

import {
    getLeaderboard,
    addTeam,
    updateTeam,
    deleteTeam
} from "@/lib/data";

export async function fetchLeaderboardAction() {
    return await getLeaderboard();
}

export async function addTeamAction(team: { name: string; score: number }) {
    return await addTeam(team);
}

export async function updateTeamAction(
    id: number,
    data: { name?: string; score?: number }
) {
    return await updateTeam(id, data);
}

export async function deleteTeamAction(id: number) {
    return await deleteTeam(id);
}

// This file is now empty as we've moved the logic to the AdminPanel component.
// We're keeping it for potential future use or if we need to separate concerns later.
