import { Module } from '@nestjs/common';

import { YoutubeModule } from '../modules/youtube/youtube.module';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule, YoutubeModule],
})
export class AppModule {}
