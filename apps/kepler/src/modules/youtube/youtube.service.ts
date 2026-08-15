import { spawn } from 'node:child_process';

import { YoutubeMetadata, youtubeMetadataSchema } from '@libs/contracts-kepler';
import { Injectable } from '@nestjs/common';

import { FfmpegService } from '../ffmpeg/ffmpeg.service';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class YoutubeService {
  constructor(
    private readonly ffmpegService: FfmpegService,
    private readonly s3Service: S3Service,
  ) {}

  public async getMetadata(
    url: string,
    includeStreamUrl?: boolean,
  ): Promise<YoutubeMetadata> {
    const rawMetadata = await this.runYtDlp([
      '--dump-single-json',
      '--skip-download',
      '--no-playlist',
      url,
    ]);

    const metadata = youtubeMetadataSchema.parse(JSON.parse(rawMetadata));

    if (includeStreamUrl) {
      metadata.stream_url = await this.getCachedStreamUrl(metadata.id, url);
    }

    return metadata;
  }

  public async getStreamUrl(url: string): Promise<string> {
    const output = await this.runYtDlp(['--print', 'id', '--no-playlist', url]);
    return this.getCachedStreamUrl(output.trim(), url);
  }

  private async getCachedStreamUrl(
    videoId: string,
    url: string,
  ): Promise<string> {
    const key = `youtube/${videoId}.m4a`;

    if (!(await this.s3Service.objectExists({ key }))) {
      const sourceUrl = await this.getSourceStreamUrl(url);
      const audio = await this.ffmpegService.remuxToM4a(sourceUrl);
      await this.s3Service.putObject({
        key,
        data: audio,
        contentType: 'audio/mp4',
      });
    }

    return this.s3Service.getSignedUrl({ key });
  }

  private async getSourceStreamUrl(url: string): Promise<string> {
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
