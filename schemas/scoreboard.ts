import { z } from 'zod';

// API: https://site.web.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const Scoreboard = z.object({
  leagues: z.array(
    z.object({
      id: z.string(),
      uid: z.string(),
      name: z.string(),
      abbreviation: z.string(),
      midsizeName: z.string(),
      slug: z.string(),
      season: z.object({
        year: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        type: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
      }),
      logos: z.array(
        z.object({
          href: z.string(),
          width: z.number(),
          height: z.number(),
          alt: z.string(),
          rel: z.array(z.string()),
          lastUpdated: z.string(),
        })
      ),
      calendarType: z.string(),
      calendarIsWhitelist: z.boolean(),
      calendarStartDate: z.string(),
      calendarEndDate: z.string(),
      calendar: z.array(z.string()),
    })
  ),
  day: z.object({ date: z.string() }),
  events: z.array(
    z.object({
      id: z.string(),
      uid: z.string(),
      date: z.string(),
      name: z.string(),
      shortName: z.string(),
      season: z.object({
        year: z.number(),
        type: z.number(),
        slug: z.string(),
      }),
      competitions: z.array(
        z.object({
          id: z.string(),
          uid: z.string(),
          date: z.string(),
          attendance: z.number(),
          type: z.object({ id: z.string(), abbreviation: z.string() }),
          timeValid: z.boolean(),
          neutralSite: z.boolean(),
          conferenceCompetition: z.boolean(),
          recent: z.boolean(),
          venue: z.object({
            id: z.string(),
            fullName: z.string(),
            address: z.object({ city: z.string(), state: z.string() }),
            capacity: z.number(),
            indoor: z.boolean(),
          }),
          competitors: z.array(
            z.object({
              id: z.string(),
              uid: z.string(),
              type: z.string(),
              order: z.number(),
              homeAway: z.string(),
              winner: z.boolean(),
              team: z.object({
                id: z.string(),
                uid: z.string(),
                location: z.string(),
                name: z.string(),
                abbreviation: z.string(),
                displayName: z.string(),
                shortDisplayName: z.string(),
                color: z.string(),
                alternateColor: z.string(),
                isActive: z.boolean(),
                venue: z.object({ id: z.string() }),
                links: z.array(
                  z.object({
                    rel: z.array(z.string()),
                    href: z.string(),
                    text: z.string(),
                    isExternal: z.boolean(),
                    isPremium: z.boolean(),
                  })
                ),
                logo: z.string(),
                conferenceId: z.string(),
              }),
              score: z.string(),
              linescores: z.array(z.object({ value: z.number() })),
              statistics: z.array(
                z.object({
                  name: z.string(),
                  abbreviation: z.string(),
                  displayValue: z.string(),
                })
              ),
              leaders: z.array(
                z.object({
                  name: z.string(),
                  displayName: z.string(),
                  shortDisplayName: z.string(),
                  abbreviation: z.string(),
                  leaders: z.array(
                    z.object({
                      displayValue: z.string(),
                      value: z.number(),
                      athlete: z.object({
                        id: z.string(),
                        fullName: z.string(),
                        displayName: z.string(),
                        shortName: z.string(),
                        links: z.array(
                          z.object({
                            rel: z.array(z.string()),
                            href: z.string(),
                          })
                        ),
                        headshot: z.string(),
                        jersey: z.string(),
                        position: z.object({ abbreviation: z.string() }),
                        team: z.object({ id: z.string() }),
                        active: z.boolean(),
                      }),
                      team: z.object({ id: z.string() }),
                    })
                  ),
                })
              ),
              curatedRank: z.object({ current: z.number() }),
              records: z.array(
                z.union([
                  z.object({
                    name: z.string(),
                    abbreviation: z.string(),
                    type: z.string(),
                    summary: z.string(),
                  }),
                  z.object({
                    name: z.string(),
                    type: z.string(),
                    summary: z.string(),
                  }),
                ])
              ),
            })
          ),
          notes: z.array(z.unknown()),
          status: z.object({
            clock: z.number(),
            displayClock: z.string(),
            period: z.number(),
            type: z.object({
              id: z.string(),
              name: z.string(),
              state: z.string(),
              completed: z.boolean(),
              description: z.string(),
              detail: z.string(),
              shortDetail: z.string(),
            }),
          }),
          broadcasts: z.array(
            z.object({ market: z.string(), names: z.array(z.string()) })
          ),
          groups: z.object({
            id: z.string(),
            name: z.string(),
            shortName: z.string(),
            isConference: z.boolean(),
          }),
          format: z.object({ regulation: z.object({ periods: z.number() }) }),
          startDate: z.string(),
          geoBroadcasts: z.array(
            z.object({
              type: z.object({ id: z.string(), shortName: z.string() }),
              market: z.object({ id: z.string(), type: z.string() }),
              media: z.object({ shortName: z.string() }),
              lang: z.string(),
              region: z.string(),
            })
          ),
        })
      ),
      links: z.array(
        z.object({
          language: z.string(),
          rel: z.array(z.string()),
          href: z.string(),
          text: z.string(),
          shortText: z.string(),
          isExternal: z.boolean(),
          isPremium: z.boolean(),
        })
      ),
      status: z.object({
        clock: z.number(),
        displayClock: z.string(),
        period: z.number(),
        type: z.object({
          id: z.string(),
          name: z.string(),
          state: z.string(),
          completed: z.boolean(),
          description: z.string(),
          detail: z.string(),
          shortDetail: z.string(),
        }),
      }),
    })
  ),
  eventsDate: z.object({ date: z.string(), seasonType: z.number() }),
});
