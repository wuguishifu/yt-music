import { Injectable } from '@nestjs/common';
import { z } from 'zod';

const envSchema = z.object({
  ENVIRONMENT: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  NODE_ENV: z.enum(['debug', 'release']).default('debug'),
  CONVEX_LOG_STREAM_SECRET: z.string().min(1),
  CONVEX_URL: z.string().min(1),
  CONVEX_SITE_URL: z.string().min(1),
  CONVEX_DEPLOYMENT: z.string().min(1),
  S3_REGION: z.string().min(1),
  S3_ENDPOINT: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_BUCKET: z.string(),
});

@Injectable()
export class ConfigService {
  public readonly env: z.infer<typeof envSchema>;

  constructor() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      throw new Error(
        `Invalid environment variables: ${z.prettifyError(result.error)}`,
      );
    }

    this.env = result.data;
  }
}
