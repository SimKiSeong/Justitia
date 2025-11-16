import { Module } from '@nestjs/common';
import {DailySummaryController} from "./controller/DailySummary.controller";
import {DailySummaryService} from "./service/DailySummary.service";

@Module({
  controllers: [DailySummaryController],
  providers: [DailySummaryService],
  exports: [DailySummaryService],
})
export class DailySummaryModule {}