import { Module } from '@nestjs/common';
import { YoutubeController } from './controller/Youtube.controller';
import { YoutubeService } from './service/Youtube.service';

@Module({
  controllers: [YoutubeController],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class YoutubeModule {}