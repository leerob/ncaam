import { z } from 'zod';
import { Schedule } from 'schemas/schedule';
import { Scoreboard } from 'schemas/scoreboard';
import { Team, Teams } from 'schemas/teams';

export async function getTeamData(teamId: string) {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`,
    { next: { revalidate: 60 } }
  );
  const data: z.infer<typeof Schedule> = await res.json();

  const games = data.events.map((event) => {
    const favoriteTeam = event.competitions[0].competitors.find(
      (competitor) => competitor.team.id === teamId
    );
    const otherTeam = event.competitions[0].competitors.find(
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
      otherTeam.team.displayName ===
      ('Iowa Hawkeyes' || 'Long Beach State Beach')
        ? '000000'
        : 'TODO';

    // Some teams don't have logos, use the default
    const logo = otherTeam.team.logos
      ? otherTeam.team.logos[0].href
      : 'https://a.espncdn.com/i/teamlogos/default-team-logo-500.png';

    return {
      date: event.competitions[0].status.type.shortDetail,
      name: otherTeam.team.displayName,
      teamId: otherTeam.team.id,
      rank: otherTeam.curatedRank.current,
      logo,
      color,
      // @ts-ignore: These are definitely there
      homeScore: favoriteTeam.score?.value,
      // @ts-ignore: These are definitely there
      awayScore: otherTeam.score?.value,
      // @ts-ignore: These are definitely there
      winner: favoriteTeam.winner,
    };
  });

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

export async function getAllTeamIds() {
  const pagePromises: Promise<z.infer<typeof Teams>>[] = [];
  for (let page = 1; page <= 8; page++) {
    pagePromises.push(
      fetch(
        `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?page=${page}`
      ).then((res) => res.json())
    );
  }

  const dataArray = await Promise.all(pagePromises);
  let teams: z.infer<typeof Team>[] = [];
  for (const data of dataArray) {
    teams = teams.concat(
      data.sports[0].leagues[0].teams.map((team) => team.team)
    );
  }

  // Sort teams alphabetically a-Z
  teams.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
  return teams;
}

export async function getTodaySchedule() {
  // Always fetch schedule dynamically for latest scores
  // ?dates=20230107
  const res = await fetch(
    'https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard',
    { cache: 'no-store' }
  );

  const data: z.infer<typeof Scoreboard> = await res.json();

  const games = data.events.map((event) => {
    const homeTeam = event.competitions[0].competitors.find(
      (competitor) => competitor.homeAway === 'home'
    );
    const awayTeam = event.competitions[0].competitors.find(
      (competitor) => competitor.homeAway === 'away'
    );

    return {
      homeTeam: formatTeamData(homeTeam),
      awayTeam: formatTeamData(awayTeam),
    };
  });

  return {
    date: data.day.date,
    games,
  };
}

// Need to extract Schedule team type
function formatTeamData(teamData: any) {
  const darkLogoTeams = [
    'Iowa Hawkeyes',
    'Long Beach State Beach',
    'Cincinnati Bearcats',
  ];

  return {
    name: teamData.team.displayName,
    teamId: teamData.team.id,
    rank: teamData.curatedRank.current,
    logo: teamData.team.logo
      ? teamData.team.logo
      : 'https://a.espncdn.com/i/teamlogos/default-team-logo-500.png',
    color: darkLogoTeams.includes(teamData.team.displayName) ? '000000' : 'N/A',
    score: teamData.score,
    winner: teamData.winner,
    record: `(${teamData.records[0].summary},  ${teamData.records[3].summary})`,
  };
}
