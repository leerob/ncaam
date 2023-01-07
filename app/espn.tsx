interface Competitor {
  id: string;
  name: string;
  logo: string;
  score: any;
  winner: boolean;
  team: {
    id: string;
    displayName: string;
    abbreviation: string;
    logos: {
      href: string;
    }[];
  };
}

export interface Game {
  date: string;
  name: string;
  logo: string;
  score: string;
  winner: boolean;
}

export async function getScheduleGames(teamId: string): Promise<Array<Game>> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  return data.events.map(
    (event: {
      competitions: {
        date: string;
        competitors: Competitor[];
      }[];
    }) => {
      const favoriteTeam: Competitor | undefined =
        event.competitions[0].competitors.find(
          (competitor) => competitor.team.id === teamId
        );
      const otherTeam: Competitor | undefined =
        event.competitions[0].competitors.find(
          (competitor) => competitor.team.id !== teamId
        );

      if (!favoriteTeam || !otherTeam) {
        throw new Error(
          'Expected to find both a favorite team and an opposing team in the event competitors'
        );
      }

      return {
        date: event.competitions[0].date,
        name: otherTeam.team.displayName,
        logo: otherTeam.team.logos[0].href,
        score:
          favoriteTeam.score &&
          `${otherTeam.score.displayValue}-${favoriteTeam.score.displayValue}`,
        winner: favoriteTeam.winner,
      };
    }
  );
}
