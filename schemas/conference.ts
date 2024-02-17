import { z } from 'zod';

// API: https://site.web.api.espn.com/apis/v2/sports/basketball/mens-college-basketball/standings?region=us&lang=en&contentorigin=espn&group=8&season=2024
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const ConferenceRankings = z.object({
  uid: z.string(),
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  shortName: z.string(),
  parent: z.object({
    uid: z.string(),
    id: z.string(),
    name: z.string(),
    abbreviation: z.string(),
    shortName: z.string(),
    slug: z.string(),
  }),
  standings: z.object({
    id: z.string(),
    name: z.string(),
    displayName: z.string(),
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
    season: z.number(),
    seasonType: z.number(),
    seasonDisplayName: z.string(),
    entries: z.array(
      z.union([
        z.object({
          team: z.object({
            id: z.string(),
            uid: z.string(),
            location: z.string(),
            name: z.string(),
            abbreviation: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            isActive: z.boolean(),
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
          stats: z.array(
            z.union([
              z.object({
                name: z.string(),
                displayName: z.string(),
                shortDisplayName: z.string(),
                description: z.string(),
                abbreviation: z.string(),
                type: z.string(),
                value: z.number(),
                displayValue: z.string(),
              }),
              z.object({
                id: z.string(),
                name: z.string(),
                abbreviation: z.string(),
                displayName: z.string(),
                shortDisplayName: z.string(),
                description: z.string(),
                type: z.string(),
                summary: z.string(),
                displayValue: z.string(),
              }),
              z.object({
                id: z.string(),
                name: z.string(),
                abbreviation: z.string(),
                type: z.string(),
                summary: z.string(),
                displayValue: z.string(),
              }),
            ])
          ),
        }),
        z.object({
          team: z.object({
            id: z.string(),
            uid: z.string(),
            location: z.string(),
            name: z.string(),
            abbreviation: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            isActive: z.boolean(),
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
                language: z.string(),
                rel: z.array(z.string()),
                href: z.string(),
                text: z.string(),
                shortText: z.string(),
                isExternal: z.boolean(),
                isPremium: z.boolean(),
              })
            ),
            rank: z.number(),
          }),
          stats: z.array(
            z.union([
              z.object({
                name: z.string(),
                displayName: z.string(),
                shortDisplayName: z.string(),
                description: z.string(),
                abbreviation: z.string(),
                type: z.string(),
                value: z.number(),
                displayValue: z.string(),
              }),
              z.object({
                id: z.string(),
                name: z.string(),
                abbreviation: z.string(),
                displayName: z.string(),
                shortDisplayName: z.string(),
                description: z.string(),
                type: z.string(),
                summary: z.string(),
                displayValue: z.string(),
              }),
              z.object({
                id: z.string(),
                name: z.string(),
                abbreviation: z.string(),
                type: z.string(),
                summary: z.string(),
                displayValue: z.string(),
              }),
            ])
          ),
        }),
      ])
    ),
  }),
  children: z.array(z.unknown()),
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
  seasons: z.array(
    z.object({
      year: z.number(),
      startDate: z.string(),
      endDate: z.string(),
      displayName: z.string(),
      types: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          abbreviation: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          hasStandings: z.boolean(),
        })
      ),
    })
  ),
});
