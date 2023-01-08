import { getTeamData } from 'app/espn';

export default async function Head({ params }: { params: { teamId: string } }) {
  const { color } = await getTeamData(params.teamId);

  return (
    <>
      <title>NCAAM Scores & Schedules</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Like ESPN, but streamlined." />
      <meta name="theme-color" content={`#${color}`} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏀</text></svg>"
      />
    </>
  );
}
