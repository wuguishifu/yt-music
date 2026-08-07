import z from 'zod';

export const youtubeMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  description: z.string(),
  channel_id: z.string(),
  channel_url: z.string(),
  duration: z.number(),
  duration_string: z.string(),
  view_count: z.number(),
  uploader: z.string(),
  uploader_url: z.string(),
  uploader_id: z.string(),
  upload_date: z.string(),
  // optionally included
  stream_url: z.string().optional(),
});

export type YoutubeMetadata = z.infer<typeof youtubeMetadataSchema>;
