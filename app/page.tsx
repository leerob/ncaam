import Image from 'next/image';

function Row({
  image,
  name,
  score,
  win,
  date,
}: {
  image: string;
  name: string;
  score: string;
  win: boolean;
  date: string;
}) {
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
          src={image}
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
          win ? (
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

interface Competitor {
  id: string;
  name: string;
  logo: string;
  score: any;
  winner: boolean;
}

export default async function Page() {
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const events = data.events.map(
    (event: {
      competitions: {
        date: string;
        competitors: any[];
      }[];
    }) => {
      const competitors = event.competitions[0].competitors.map(
        (competitor) => {
          return {
            id: competitor.team.id,
            name: competitor.team.displayName,
            logo: competitor.team.logos[0].href,
            score: competitor.score,
            winner: competitor.winner,
          };
        }
      );

      // This is hacky, but it works for now
      const favoriteTeam: Competitor = competitors.find(
        (competitor) => competitor.id === '66'
      )!;
      const otherTeam: Competitor = competitors.find(
        (competitor) => competitor.id !== '66'
      )!;

      return {
        date: event.competitions[0].date,
        name: otherTeam.name,
        logo: otherTeam.logo,
        score:
          favoriteTeam.score &&
          `${otherTeam.score.displayValue}-${favoriteTeam.score.displayValue}`,
        winner: favoriteTeam.winner,
      };
    }
  );

  return (
    <>
      <h2 className="font-semibold text-xl ml-4">Schedule</h2>
      <h3 className="font-semibold text-gray-700 mb-2 ml-4">Full</h3>
      <div>
        {events.map(
          (event: {
            logo: string;
            name: string;
            score: string;
            winner: boolean;
            date: string;
          }) => {
            return (
              <Row
                key={event.name}
                image={event.logo}
                name={event.name}
                score={event.score}
                win={event.winner}
                date={event.date}
              />
            );
          }
        )}
      </div>
    </>
  );
}
