import { Module } from '@nestjs/common';
import {MusicScoreController} from "./controller/MusicScore.controller";
import {MusicScoreService} from "./service/MusicScore.service";

@Module({
  controllers: [MusicScoreController],
  providers: [MusicScoreService],
  exports: [MusicScoreService],
})
export class MusicScoreModule {}