interface Competitor {
  id: string;
  name: string;
  logo: string;
  score: {
    value: string;
  };
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
  awayScore: number | undefined;
  date: Date;
  homeScore: number | undefined;
  logo: string;
  color: string;
  name: string;
  winner: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
  record: string;
  standing: string;
  games: Array<Game>;
}

export async function getTeamData(teamId: string): Promise<Team> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const games = data.events.map(
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

      // Unfortunately this data isn't on this API yet
      // Probably will need to stitch together APIs or find a different way
      // This is for teams with black logos, so we invert the color of the image
      const color =
        otherTeam.team.displayName === 'Iowa Hawkeyes' ? '000000' : 'TODO';

      return {
        date: new Date(event.competitions[0].date),
        name: otherTeam.team.displayName,
        logo: otherTeam.team.logos[0].href,
        color,
        homeScore: favoriteTeam?.score?.value,
        awayScore: otherTeam?.score?.value,
        winner: favoriteTeam.winner,
      };
    }
  );

  return {
    id: teamId,
    name: data.team.displayName,
    logo: data.team.logo,
    color: data.team.color,
    record: data.team.recordSummary,
    standing: data.team.standingSummary,
    games,
  };
}
