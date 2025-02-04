"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    fetchLeaderboardAction,
    addTeamAction,
    updateTeamAction,
    deleteTeamAction,
} from "./actions";
import type { Team } from "@/lib/data";
import { useDebouncedCallback } from "use-debounce";

export function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [teams, setTeams] = useState<Team[]>([]);
    const [newTeam, setNewTeam] = useState({ name: "", score: 0 });
    const router = useRouter();

    const fetchTeams = async () => {
        const leaderboard = await fetchLeaderboardAction();
        setTeams(leaderboard);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            // In a real app, use proper authentication
            await fetchTeams();
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const handleAddTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTeamAction(newTeam);
        setNewTeam({ name: "", score: 0 });
        fetchTeams();
        router.refresh();
    };

    const debouncedUpdateTeam = useDebouncedCallback(
        async (id: number, field: "name" | "score", value: string | number) => {
            await updateTeamAction(id, { [field]: value });
            fetchTeams();
            router.refresh();
        },
        1000
    );

    const handleUpdateTeam = (
        id: number,
        field: "name" | "score",
        value: string | number
    ) => {
        // Immediately update local state
        setTeams(
            teams.map((team) =>
                team.id === id ? { ...team, [field]: value } : team
            )
        );
        // Debounce the API call and subsequent refresh
        debouncedUpdateTeam(id, field, value);
    };

    const handleDeleteTeam = async (id: number) => {
        await deleteTeamAction(id);
        fetchTeams();
        router.refresh();
    };

    if (!isAuthenticated) {
        return (
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit">Login</Button>
            </form>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Leaderboard Management</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teams.map((team) => (
                        <TableRow key={team.id}>
                            <TableCell>
                                <Input
                                    value={team.name}
                                    onChange={(e) =>
                                        handleUpdateTeam(
                                            team.id,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={team.score || ""}
                                    onChange={(e) =>
                                        handleUpdateTeam(
                                            team.id,
                                            "score",
                                            e.target.value === ""
                                                ? 0
                                                : Number.parseInt(
                                                      e.target.value
                                                  )
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteTeam(team.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <form onSubmit={handleAddTeam} className="space-y-4">
                <h3 className="text-xl font-semibold">Add New Team</h3>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input
                            id="teamName"
                            value={newTeam.name}
                            onChange={(e) =>
                                setNewTeam({ ...newTeam, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <Label htmlFor="teamScore">Initial Score</Label>
                        <Input
                            id="teamScore"
                            type="number"
                            value={newTeam.score}
                            onChange={(e) =>
                                setNewTeam({
                                    ...newTeam,
                                    score: Number.parseInt(e.target.value),
                                })
                            }
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <Button type="submit">Add Team</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
