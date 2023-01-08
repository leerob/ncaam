interface Competitor {
  id: string;
  name: string;
  logo: string;
  score: {
    value: string;
  };
  winner: boolean;
  curatedRank: {
    current: number;
  };
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
  date: Date;
  homeScore: number | undefined;
  awayScore: number | undefined;
  teamId: string;
  rank: number;
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

      // Some teams don't have logos, use the default
      const logo = otherTeam.team.logos
        ? otherTeam.team.logos[0].href
        : 'https://a.espncdn.com/i/teamlogos/default-team-logo-500.png';

      return {
        date: new Date(event.competitions[0].date),
        name: otherTeam.team.displayName,
        teamId: otherTeam.team.id,
        rank: otherTeam.curatedRank.current,
        logo,
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

export async function getAllTeamIds(): Promise<Team[]> {
  const res = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams'
  );
  const data = await res.json();

  return data.sports[0].leagues[0].teams.map(
    ({ team }: { team: { id: number; displayName: string } }) => {
      return {
        id: team.id,
        name: team.displayName,
      };
    }
  );
}
