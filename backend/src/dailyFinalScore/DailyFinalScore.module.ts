import { Module } from '@nestjs/common';
import {DailyFinalScoreController} from "./controller/DailyFinalScore.controller";
import {DailyFinalScoreService} from "./service/DailyFinalScore.service";

@Module({
  controllers: [DailyFinalScoreController],
  providers: [DailyFinalScoreService],
  exports: [DailyFinalScoreService],
})
export class DailyFinalScoreModule {}