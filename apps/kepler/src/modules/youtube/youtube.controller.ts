import { keplerRootRouter } from '@libs/contracts-kepler';
import { Controller } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';

import { YoutubeService } from './youtube.service';

@Controller()
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @TsRestHandler(keplerRootRouter.v1.youtube.getMetadata)
  public getMetadata() {
    return tsRestHandler(
      keplerRootRouter.v1.youtube.getMetadata,
      async ({ query }) => ({
        status: 200,
        body: await this.youtubeService.getMetadata(
          query.url,
          query.includeStreamUrl,
        ),
      }),
    );
  }

  @TsRestHandler(keplerRootRouter.v1.youtube.getStreamUrl)
  public getStreamUrl() {
    return tsRestHandler(
      keplerRootRouter.v1.youtube.getStreamUrl,
      async ({ query }) => ({
        status: 200,
        body: await this.youtubeService.getStreamUrl(query.url),
      }),
    );
  }
}
