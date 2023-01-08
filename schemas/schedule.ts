import { z } from 'zod';

// API: https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const Schedule = z.object({
  timestamp: z.string(),
  status: z.string(),
  season: z.object({
    year: z.number(),
    type: z.number(),
    name: z.string(),
    displayName: z.string(),
    half: z.number(),
  }),
  team: z.object({
    id: z.string(),
    abbreviation: z.string(),
    location: z.string(),
    name: z.string(),
    displayName: z.string(),
    clubhouse: z.string(),
    color: z.string(),
    logo: z.string(),
    recordSummary: z.string(),
    seasonSummary: z.string(),
    standingSummary: z.string(),
    groups: z.object({
      id: z.string(),
      parent: z.object({ id: z.string() }),
      isConference: z.boolean(),
    }),
  }),
  events: z.array(
    z.union([
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.union([
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  leaders: z.array(
                    z.object({
                      name: z.string(),
                      displayName: z.string(),
                      abbreviation: z.string(),
                      leaders: z.array(
                        z.object({
                          displayValue: z.string(),
                          value: z.number(),
                          athlete: z.object({
                            id: z.string(),
                            lastName: z.string(),
                            displayName: z.string(),
                            shortName: z.string(),
                            links: z.array(
                              z.object({
                                rel: z.array(z.string()),
                                href: z.string(),
                              })
                            ),
                          }),
                        })
                      ),
                    })
                  ),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
              ])
            ),
            notes: z.array(z.unknown()),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.union([
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  leaders: z.array(
                    z.object({
                      name: z.string(),
                      displayName: z.string(),
                      abbreviation: z.string(),
                      leaders: z.array(
                        z.object({
                          displayValue: z.string(),
                          value: z.number(),
                          athlete: z.object({
                            id: z.string(),
                            lastName: z.string(),
                            displayName: z.string(),
                            shortName: z.string(),
                            links: z.array(
                              z.object({
                                rel: z.array(z.string()),
                                href: z.string(),
                              })
                            ),
                          }),
                        })
                      ),
                    })
                  ),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
              ])
            ),
            notes: z.array(
              z.object({ type: z.string(), headline: z.string() })
            ),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
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
                altDetail: z.string(),
              }),
            }),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.union([
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  leaders: z.array(
                    z.object({
                      name: z.string(),
                      displayName: z.string(),
                      abbreviation: z.string(),
                      leaders: z.array(
                        z.object({
                          displayValue: z.string(),
                          value: z.number(),
                          athlete: z.object({
                            id: z.string(),
                            lastName: z.string(),
                            displayName: z.string(),
                            shortName: z.string(),
                            links: z.array(
                              z.object({
                                rel: z.array(z.string()),
                                href: z.string(),
                              })
                            ),
                          }),
                        })
                      ),
                    })
                  ),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
              ])
            ),
            notes: z.array(
              z.object({ type: z.string(), headline: z.string() })
            ),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.union([
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  leaders: z.array(
                    z.object({
                      name: z.string(),
                      displayName: z.string(),
                      abbreviation: z.string(),
                      leaders: z.array(
                        z.object({
                          displayValue: z.string(),
                          value: z.number(),
                          athlete: z.object({
                            id: z.string(),
                            lastName: z.string(),
                            displayName: z.string(),
                            shortName: z.string(),
                            links: z.array(
                              z.object({
                                rel: z.array(z.string()),
                                href: z.string(),
                              })
                            ),
                          }),
                        })
                      ),
                    })
                  ),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
              ])
            ),
            notes: z.array(
              z.object({ type: z.string(), headline: z.string() })
            ),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.union([
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
                z.object({
                  id: z.string(),
                  type: z.string(),
                  order: z.number(),
                  homeAway: z.string(),
                  winner: z.boolean(),
                  team: z.object({
                    id: z.string(),
                    location: z.string(),
                    nickname: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
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
                    links: z.array(
                      z.object({
                        rel: z.array(z.string()),
                        href: z.string(),
                        text: z.string(),
                      })
                    ),
                  }),
                  score: z.object({
                    value: z.number(),
                    displayValue: z.string(),
                  }),
                  leaders: z.array(
                    z.object({
                      name: z.string(),
                      displayName: z.string(),
                      abbreviation: z.string(),
                      leaders: z.array(
                        z.object({
                          displayValue: z.string(),
                          value: z.number(),
                          athlete: z.object({
                            id: z.string(),
                            lastName: z.string(),
                            displayName: z.string(),
                            shortName: z.string(),
                            links: z.array(
                              z.object({
                                rel: z.array(z.string()),
                                href: z.string(),
                              })
                            ),
                          }),
                        })
                      ),
                    })
                  ),
                  record: z.array(
                    z.union([
                      z.object({
                        id: z.string(),
                        abbreviation: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                      z.object({
                        id: z.string(),
                        displayName: z.string(),
                        shortDisplayName: z.string(),
                        description: z.string(),
                        type: z.string(),
                        displayValue: z.string(),
                      }),
                    ])
                  ),
                  curatedRank: z.object({ current: z.number() }),
                }),
              ])
            ),
            notes: z.array(z.unknown()),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
                order: z.number(),
                homeAway: z.string(),
                team: z.object({
                  id: z.string(),
                  location: z.string(),
                  nickname: z.string(),
                  abbreviation: z.string(),
                  displayName: z.string(),
                  shortDisplayName: z.string(),
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
                  links: z.array(
                    z.object({
                      rel: z.array(z.string()),
                      href: z.string(),
                      text: z.string(),
                    })
                  ),
                }),
                score: z.object({
                  value: z.number(),
                  displayValue: z.string(),
                }),
                record: z.array(
                  z.object({
                    id: z.string(),
                    abbreviation: z.string(),
                    displayName: z.string(),
                    shortDisplayName: z.string(),
                    description: z.string(),
                    type: z.string(),
                    displayValue: z.string(),
                  })
                ),
                curatedRank: z.object({ current: z.number() }),
              })
            ),
            notes: z.array(z.unknown()),
            broadcasts: z.array(z.unknown()),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
                order: z.number(),
                homeAway: z.string(),
                team: z.object({
                  id: z.string(),
                  location: z.string(),
                  nickname: z.string(),
                  abbreviation: z.string(),
                  displayName: z.string(),
                  shortDisplayName: z.string(),
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
                  links: z.array(
                    z.object({
                      rel: z.array(z.string()),
                      href: z.string(),
                      text: z.string(),
                    })
                  ),
                }),
                curatedRank: z.object({ current: z.number() }),
              })
            ),
            notes: z.array(z.unknown()),
            broadcasts: z.array(
              z.object({
                type: z.object({ id: z.string(), shortName: z.string() }),
                market: z.object({ id: z.string(), type: z.string() }),
                media: z.object({ shortName: z.string() }),
                lang: z.string(),
                region: z.string(),
              })
            ),
            tickets: z.array(
              z.object({
                id: z.string(),
                summary: z.string(),
                description: z.string(),
                maxPrice: z.number(),
                startingPrice: z.number(),
                numberAvailable: z.number(),
                totalPostings: z.number(),
                links: z.array(
                  z.object({ rel: z.array(z.string()), href: z.string() })
                ),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
                order: z.number(),
                homeAway: z.string(),
                team: z.object({
                  id: z.string(),
                  location: z.string(),
                  nickname: z.string(),
                  abbreviation: z.string(),
                  displayName: z.string(),
                  shortDisplayName: z.string(),
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
                  links: z.array(
                    z.object({
                      rel: z.array(z.string()),
                      href: z.string(),
                      text: z.string(),
                    })
                  ),
                }),
                curatedRank: z.object({ current: z.number() }),
              })
            ),
            notes: z.array(
              z.object({ type: z.string(), headline: z.string() })
            ),
            broadcasts: z.array(z.unknown()),
            tickets: z.array(
              z.object({
                id: z.string(),
                summary: z.string(),
                description: z.string(),
                maxPrice: z.number(),
                startingPrice: z.number(),
                numberAvailable: z.number(),
                totalPostings: z.number(),
                links: z.array(
                  z.object({ rel: z.array(z.string()), href: z.string() })
                ),
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
      }),
      z.object({
        id: z.string(),
        date: z.string(),
        name: z.string(),
        shortName: z.string(),
        season: z.object({ year: z.number(), displayName: z.string() }),
        seasonType: z.object({
          id: z.string(),
          type: z.number(),
          name: z.string(),
          abbreviation: z.string(),
        }),
        week: z.object({ number: z.number(), text: z.string() }),
        timeValid: z.boolean(),
        competitions: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            attendance: z.number(),
            type: z.object({
              id: z.string(),
              text: z.string(),
              abbreviation: z.string(),
              slug: z.string(),
              type: z.string(),
            }),
            timeValid: z.boolean(),
            neutralSite: z.boolean(),
            boxscoreAvailable: z.boolean(),
            ticketsAvailable: z.boolean(),
            venue: z.object({
              fullName: z.string(),
              address: z.object({ city: z.string(), state: z.string() }),
            }),
            competitors: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
                order: z.number(),
                homeAway: z.string(),
                team: z.object({
                  id: z.string(),
                  location: z.string(),
                  nickname: z.string(),
                  abbreviation: z.string(),
                  displayName: z.string(),
                  shortDisplayName: z.string(),
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
                  links: z.array(
                    z.object({
                      rel: z.array(z.string()),
                      href: z.string(),
                      text: z.string(),
                    })
                  ),
                }),
                curatedRank: z.object({ current: z.number() }),
              })
            ),
            notes: z.array(z.unknown()),
            broadcasts: z.array(z.unknown()),
            tickets: z.array(
              z.object({
                id: z.string(),
                summary: z.string(),
                description: z.string(),
                maxPrice: z.number(),
                startingPrice: z.number(),
                numberAvailable: z.number(),
                totalPostings: z.number(),
                links: z.array(
                  z.object({ rel: z.array(z.string()), href: z.string() })
                ),
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
      }),
    ])
  ),
  requestedSeason: z.object({
    year: z.number(),
    type: z.number(),
    name: z.string(),
    displayName: z.string(),
  }),
});
