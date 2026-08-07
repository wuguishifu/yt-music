import z from 'zod';

export const environment = z
  .object({
    EXPO_PUBLIC_CONVEX_URL: z.string(),
    EXPO_PUBLIC_CONVEX_SITE_URL: z.string(),
    EXPO_PUBLIC_KEPLER_BASE_URL: z.string(),
  })
  .transform((data) => ({
    CONVEX_URL: data.EXPO_PUBLIC_CONVEX_URL,
    CONVEX_SITE_URL: data.EXPO_PUBLIC_CONVEX_SITE_URL,
    KEPLER_BASE_URL: data.EXPO_PUBLIC_KEPLER_BASE_URL,
  }))
  .parse(process.env);
