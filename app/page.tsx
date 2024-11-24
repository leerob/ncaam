import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTeamIds, getConferenceRankings, getTeamData } from 'app/espn';
import TeamSelect from './[teamId]/select';
import { Scores } from './scores';
import { Suspense } from 'react';
import { ScoresLoading } from './scores-loading';

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
        'flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2',
        { 'border-b border-gray-200 dark:border-gray-800': !isLast }
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
      className={clsx(
        'flex flex-col min-[450px]:flex-row justify-between px-0 min-[450px]:px-4 py-2',
        { 'border-b border-gray-200 dark:border-gray-800': !isLast }
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

export default async function HomePage() {
  const [team, allTeams, confRankings] = await Promise.all([
    getTeamData('66'),
    getAllTeamIds(),
    getConferenceRankings(),
  ]);
  const { name, record, color, standing, games, logo } = team;

  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3">
      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
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
          <h1 className="font-semibold text-2xl ml-2">{name}</h1>
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 mb-2">{`${record} • ${standing}`}</h3>
        <TeamSelect allTeams={allTeams} teamId={'66'} />
        <h2 className="font-semibold text-xl">Schedule</h2>
        <div>
          {games.map((game, index) => {
            return (
              <Row
                key={game.id}
                index={index}
                isLast={index === games.length - 1}
                {...game}
              />
            );
          })}
        </div>
      </section>
      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-2xl">Scores</h2>
        <Suspense fallback={<ScoresLoading />}>
          <Scores />
        </Suspense>
      </section>
      <section className="w-full mx-auto p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-2xl">Conference</h2>
        <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2 flex justify-end pr-4">
          GB
        </h3>

        <div>
          {confRankings.map((team, index) => {
            return (
              <RankingRow
                key={team.teamId}
                index={index}
                isLast={index === confRankings.length - 1}
                {...team}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
