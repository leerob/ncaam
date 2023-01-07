import Image from 'next/image';
import { Game, getScheduleGames } from './espn';

function Row({ logo, name, score, winner, date }: Game) {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex border-b border-gray-200 justify-between px-8 py-2">
      <div className="flex">
        <Image
          src={logo}
          alt="Iowa State Cyclones"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <p className="font-semibold ml-4">{name}</p>
      </div>
      <div className="flex text-right">
        <p className="text-gray-700">{score}</p>
        {score ? (
          winner ? (
            <p className="font-semibold text-green-700 ml-2">W</p>
          ) : (
            <p className="font-semibold text-red-700 ml-2">L</p>
          )
        ) : (
          <p className="text-gray-700 proportional-nums">{formattedDate}</p>
        )}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const games = await getScheduleGames('66');

  return (
    <>
      <h2 className="font-semibold text-xl ml-4">Schedule</h2>
      <h3 className="font-semibold text-gray-700 mb-2 ml-4">Full</h3>
      <div>
        {games.map((game) => {
          return <Row key={game.name} {...game} />;
        })}
      </div>
    </>
  );
}
