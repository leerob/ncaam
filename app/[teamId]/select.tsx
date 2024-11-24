'use client';

import { useRouter } from 'next/navigation';
import { TeamBasicInfo } from 'app/espn';
import { ChevronDown } from 'lucide-react';

export default function TeamSelect({
  allTeams,
  teamId,
}: {
  allTeams: TeamBasicInfo[];
  teamId: string;
}) {
  const router = useRouter();

  function changeTeam(event: React.ChangeEvent<HTMLSelectElement>) {
    const teamId = event.target.value;
    router.push(`/${teamId}`);
  }

  return (
    <div className="mb-6 relative">
      <select
        className="appearance-none w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 font-semibold px-3 py-2 pr-8 rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-sans"
        defaultValue={teamId}
        onChange={changeTeam}
      >
        {allTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.displayName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}
