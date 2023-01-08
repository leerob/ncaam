'use client';

import { Team } from 'app/espn';
import { useRouter } from 'next/navigation';

export default function TeamSelect({
  allTeams,
  teamId,
}: {
  allTeams: Team[];
  teamId: string;
}) {
  const router = useRouter();
  function changeTeam(event: React.ChangeEvent<HTMLSelectElement>) {
    const teamId = event.target.value;
    router.push(`/${teamId}`);
  }

  return (
    <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      {/* Safari web styles are still bad */}
      <select
        className="font-semibold px-2 py-3 w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 border-r-transparent border-r-8 rounded-md bg-none"
        defaultValue={teamId}
        onChange={changeTeam}
      >
        {/* <optgroup label="Big 12"> */}
        {/* Could be nice, if I had that data here */}
        {allTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
}
