import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FfmpegService {
  public async remuxToM4a(inputUrl: string): Promise<Buffer> {
    // faststart needs a seekable output, so remux to a temp file instead of a pipe
    const dir = await mkdtemp(join(tmpdir(), 'kepler-ffmpeg-'));
    const outputPath = join(dir, `${randomUUID()}.m4a`);

    try {
      await this.runFfmpeg([
        '-y',
        '-i',
        inputUrl,
        '-vn',
        '-c:a',
        'copy',
        '-movflags',
        '+faststart',
        '-f',
        'ipod',
        outputPath,
      ]);
      return await readFile(outputPath);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  private async runFfmpeg(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = spawn('ffmpeg', args);

      let stderr = '';

      process.stderr.on('data', (data) => (stderr += data));

      process.on('error', reject);
      process.on('close', (code) => {
        if (code !== 0) return reject(new Error(stderr));
        resolve();
      });
    });
  }
}
