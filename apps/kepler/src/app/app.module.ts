import { Module } from '@nestjs/common';

import { YoutubeModule } from '../modules/youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
})
export class AppModule {}
