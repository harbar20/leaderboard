import { getLeaderboard } from "@/lib/data";
import { ClientRefresh } from "./components/ClientRefresh";

export const revalidate = 10;
export const dynamic = "force-dynamic";

export default async function Home() {
    const teams = await getLeaderboard();

    return (
        <ClientRefresh>
            <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
                <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
                <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Team
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {teams.map((team, index) => (
                                <tr key={team.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {team.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {team.score}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ClientRefresh>
    );
}
