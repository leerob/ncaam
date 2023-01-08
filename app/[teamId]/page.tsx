import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Game, getAllTeamIds, getTeamData } from 'app/espn';

function Row({
  awayScore,
  color,
  date,
  homeScore,
  logo,
  name,
  rank,
  teamId,
  winner,
}: Game) {
  const formattedDate = date.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 justify-between px-4 py-2">
      <div className="flex">
        <Image
          src={logo}
          alt="Iowa State Cyclones"
          width={20}
          height={20}
          className={clsx('h-5 w-5', {
            invert: color === '000000',
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
      <div className="flex text-right">
        {homeScore ? (
          <p className="text-gray-700 dark:text-gray-300">{`${homeScore}-${awayScore}`}</p>
        ) : null}
        {homeScore ? (
          winner ? (
            <p className="font-semibold text-green-700 ml-2">W</p>
          ) : (
            <p className="font-semibold text-red-700 ml-2">L</p>
          )
        ) : homeScore === 0 ? (
          <p className="font-semibold text-gray-500 ml-2">—</p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 proportional-nums">
            {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function HomePage({
  params,
}: {
  params: { teamId: string };
}) {
  const [team, allTeams] = await Promise.all([
    getTeamData(params.teamId),
    getAllTeamIds(),
  ]);
  const { name, record, color, standing, games } = team;

  return (
    <>
      <div className="h-4" style={{ background: `#${color}` }} />
      <section className="my-8 max-w-lg mx-auto px-2">
        <h1 className="font-semibold text-2xl">{name}</h1>
        <h3 className="text-gray-700 dark:text-gray-300 mb-2">{`${record} • ${standing}`}</h3>
        <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          {/* Safari web styles are still bad */}
          <select
            className="font-semibold px-2 py-3 w-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 border-r-transparent border-r-8 rounded-md bg-none"
            defaultValue={params.teamId}
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
        <h2 className="font-semibold text-xl">Schedule</h2>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Full
        </h3>
        <div>
          {games.map((game) => {
            return <Row key={game.name} {...game} />;
          })}
        </div>
      </section>
    </>
  );
}
