import { getConferenceRankings } from 'app/espn';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

function RankingRow({
  color,
  gamesBack,
  index,
  isLast,
  logo,
  name,
  teamId,
}: any) {
  return (
    <div
      className={clsx('flex flex-row justify-between px-0 py-2', {
        'border-b border-gray-200 dark:border-gray-800': !isLast,
      })}
    >
      <div className="flex">
        <Image
          src={logo}
          alt={name}
          priority={index < 10}
          width={20}
          height={20}
          className={clsx('h-5 w-5', {
            'dark:invert': color === '000000',
          })}
        />
        <Link href={`/${teamId}`} className="font-semibold ml-4">
          {name}
        </Link>
      </div>
      <div className="flex flex-row-reverse justify-end min-[450px]:flex-row">
        <p className="text-gray-700 dark:text-gray-300 tabular-nums">
          {gamesBack}
        </p>
      </div>
    </div>
  );
}

export default async function ConferencePage() {
  const confRankings = await getConferenceRankings();

  return (
    <section className="w-full mx-auto p-6">
      <h2 className="font-semibold text-2xl">Conference</h2>
      <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex justify-end">
        GB
      </h3>
      <div>
        {confRankings.map((team, index) => (
          <RankingRow
            key={team.teamId}
            index={index}
            isLast={index === confRankings.length - 1}
            {...team}
          />
        ))}
      </div>
    </section>
  );
}
