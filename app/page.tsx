import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTeamIds, getTeamData } from 'app/espn';
import TeamSelect from './[teamId]/select';
import ConferencePage from './conference/page';
import ScoresPage from './scores/page';

function Row({
  awayScore,
  color,
  date,
  homeScore,
  index,
  isLast,
  logo,
  name,
  rank,
  teamId,
  winner,
}: any) {
  return (
    <div
      className={clsx(
        'flex flex-col min-[450px]:flex-row justify-between px-0 py-2',
        { 'border-b border-gray-200 dark:border-gray-800': !isLast },
      )}
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
          {rank !== 99 ? (
            <span className="text-sm uppercase font-normal text-gray-500 mr-2">
              {rank}
            </span>
          ) : null}
          {name}
        </Link>
      </div>
      <div className="flex flex-row-reverse justify-end min-[450px]:flex-row">
        {homeScore ? (
          <p className="text-gray-700 dark:text-gray-300 tabular-nums">{`${homeScore}-${awayScore}`}</p>
        ) : null}
        {homeScore ? (
          winner ? (
            <p className="font-semibold text-green-700 dark:text-green-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
              W
            </p>
          ) : (
            <p className="font-semibold text-red-700 dark:text-red-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
              L
            </p>
          )
        ) : homeScore === 0 ? (
          <p className="font-semibold text-gray-500 ml-0 min-[450px]:ml-2 w-5 mr-4 min-[450px]:mr-0 text-center">
            —
          </p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{date}</p>
        )}
      </div>
    </div>
  );
}

async function Schedule() {
  const [team, allTeams] = await Promise.all([
    getTeamData('66'),
    getAllTeamIds(),
  ]);
  const { name, record, color, standing, games, logo } = team;
  const nextGame = games.find((game) => game.homeScore === undefined);

  return (
    <section className="w-full mx-auto p-6">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Logo"
          priority
          width={24}
          height={24}
          className={clsx('h-6 w-6', {
            'dark:invert': color === '000000',
          })}
        />
        {nextGame?.selectedTeamRank !== 99 ? (
          <span className="text-sm uppercase font-normal text-gray-500 ml-2">
            {nextGame?.selectedTeamRank}
          </span>
        ) : null}
        <h1 className="font-semibold text-2xl ml-2">{name}</h1>
      </div>
      <h3 className="text-gray-700 dark:text-gray-300 mb-2">{`${record} • ${standing}`}</h3>
      <TeamSelect allTeams={allTeams} teamId={'66'} />
      <h2 className="font-semibold text-xl">Schedule</h2>
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">Next</h3>
      {nextGame && <Row isLast {...nextGame} />}
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-4">
        Full
      </h3>
      <div>
        {games.map((game, index) => (
          <Row
            key={game.id}
            index={index}
            isLast={index === games.length - 1}
            {...game}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="md:hidden">
        <Schedule />
      </main>
      <main className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800">
        <Schedule />
        <ScoresPage />
        <ConferencePage />
      </main>
    </>
  );
}
