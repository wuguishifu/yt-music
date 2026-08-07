import z from 'zod';

export const youtubeTrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  duration: z.number(),
  thumbnailUrl: z.string(),
  streamUrl: z.string(),
});
export type YoutubeTrack = z.infer<typeof youtubeTrackSchema>;
