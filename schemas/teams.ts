import { z } from 'zod';

// API: https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams
// JSON to Zod: https://rsinohara.github.io/json-to-zod-react

export const Team = z.object({
  id: z.string(),
  uid: z.string(),
  slug: z.string(),
  abbreviation: z.string(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  name: z.string(),
  nickname: z.string(),
  location: z.string(),
  color: z.string(),
  alternateColor: z.string().optional(), // optional field
  isActive: z.boolean(),
  isAllStar: z.boolean(),
  logos: z.array(
    z.object({
      href: z.string(),
      alt: z.string(),
      rel: z.array(z.string()),
      width: z.number(),
      height: z.number(),
    })
  ),
  links: z.array(
    z.union([
      z.object({
        language: z.string(),
        rel: z.array(z.string()),
        href: z.string(),
        text: z.string(),
        shortText: z.string(),
        isExternal: z.boolean(),
        isPremium: z.boolean(),
      }),
      z.object({
        language: z.string(),
        rel: z.array(z.string()),
        href: z.string(),
        text: z.string(),
        isExternal: z.boolean(),
        isPremium: z.boolean(),
      }),
    ])
  ),
});

export const Teams = z.object({
  sports: z.array(
    z.object({
      id: z.string(),
      uid: z.string(),
      name: z.string(),
      slug: z.string(),
      leagues: z.array(
        z.object({
          id: z.string(),
          uid: z.string(),
          name: z.string(),
          abbreviation: z.string(),
          shortName: z.string(),
          slug: z.string(),
          teams: z.array(
            z.object({
              team: Team,
            })
          ),
        })
      ),
    })
  ),
});
