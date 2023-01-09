import clsx from 'clsx';
import Image from 'next/image';
import DateSelect from 'app/scores/date-select';
import { getTodaySchedule } from 'app/espn';

function Team({ color, score, index, logo, name, rank, record, winner }: any) {
  return (
    <div className="flex flex-row justify-between px-4 py-2">
      <div className="flex">
        <Image
          src={logo}
          alt={name}
          priority={index < 10}
          width={24}
          height={24}
          className={clsx('h-6 w-6 mt-[2px]', {
            'dark:invert': color === '000000',
          })}
        />
        <div className="flex flex-col ml-4 leading-4 gap-y-1">
          <p
            className={clsx('font-semibold', {
              'text-gray-500': !winner,
              'text-black dark:text-white': winner,
            })}
          >
            {rank !== 99 ? (
              <span className="text-sm uppercase font-normal text-gray-500 mr-2">
                {rank}
              </span>
            ) : null}
            {name}
          </p>
          <p
            className={clsx('text-sm', {
              'text-gray-500': !winner,
              'text-gray-600 dark:text-gray-400': winner,
            })}
          >
            {record}
          </p>
        </div>
      </div>
      <div
        className={clsx('flex', {
          'text-gray-500': !winner,
          'text-gray-900 dark:text-gray-100': winner,
        })}
      >
        <p className="leading-normal font-semibold text-xl">{score}</p>
      </div>
    </div>
  );
}

export default async function ScoresPage() {
  const { games } = await getTodaySchedule();

  return (
    <section className="my-6 max-w-lg mx-auto px-4">
      <h2 className="font-semibold text-xl">Scores</h2>
      {/* <DateSelect currentDate="20230108" /> */}
      <div>
        {games.map((game, index) => {
          return (
            <div
              key={index}
              className={clsx('py-2', {
                'border-b border-gray-200 dark:border-gray-800':
                  index !== games.length - 1,
              })}
            >
              <Team index={index} {...game.homeTeam} />
              <Team index={index} {...game.awayTeam} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
