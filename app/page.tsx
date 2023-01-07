import Image from 'next/image';
import { Game, getTeamData } from './espn';
import clsx from 'clsx';

function Row({ logo, name, homeScore, awayScore, color, winner, date }: Game) {
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
        <p className="font-semibold ml-4">{name}</p>
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

export default async function HomePage() {
  const { name, record, color, standing, games } = await getTeamData('66');

  return (
    <>
      <div className="h-4" style={{ background: `#${color}` }} />
      <section className="my-8 max-w-md mx-auto">
        <h1 className="font-semibold text-2xl">{name}</h1>
        <h3 className="text-gray-700 dark:text-gray-300 mb-4">{`${record} • ${standing}`}</h3>
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
