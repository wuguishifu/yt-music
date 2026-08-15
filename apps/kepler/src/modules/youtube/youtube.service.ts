import { spawn } from 'node:child_process';

import { YoutubeMetadata, youtubeMetadataSchema } from '@libs/contracts-kepler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class YoutubeService {
  public async getMetadata(
    url: string,
    includeStreamUrl?: boolean,
  ): Promise<YoutubeMetadata> {
    const [rawMetadata, streamUrl] = await Promise.all([
      this.runYtDlp([
        '--dump-single-json',
        '--skip-download',
        '--no-playlist',
        url,
      ]),
      includeStreamUrl ? this.getStreamUrl(url) : undefined,
    ] as const);

    const metadata = youtubeMetadataSchema.parse(JSON.parse(rawMetadata));

    if (includeStreamUrl) {
      metadata.stream_url = streamUrl;
    }

    return metadata;
  }

  public async getStreamUrl(url: string): Promise<string> {
    const output = await this.runYtDlp([
      '-g',
      '-U',
      '-f',
      'bestaudio[ext=m4a]/bestaudio',
      '--no-playlist',
      url,
    ]);

    const lines = output.trim().split('\n');
    return lines[lines.length - 1];
  }

  private async runYtDlp(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn('yt-dlp', args);

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => (stdout += data));
      process.stderr.on('data', (data) => (stderr += data));

      process.on('error', reject);
      process.on('close', (code) => {
        if (code !== 0) return reject(new Error(stderr));
        try {
          resolve(stdout);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
