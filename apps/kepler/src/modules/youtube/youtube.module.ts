import { Module } from '@nestjs/common';

import { FfmpegModule } from '../ffmpeg/ffmpeg.module';
import { S3Module } from '../s3/s3.module';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

@Module({
  imports: [FfmpegModule, S3Module],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})
export class YoutubeModule {}
