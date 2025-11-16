import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { XMentionModule } from './xMention/XMention.module';
import { YoutubeModule } from './youtube/Youtube.module';
import {MusicScoreModule} from "./musicScore/MusicScore.module";
import {DailyFinalScoreModule} from "./dailyFinalScore/DailyFinalScore.module";
import {DailySummaryModule} from "./dailySummary/DailySummary.module";
import { SentimentModule } from './sentiment/Sentiment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DBModule,
    XMentionModule,
    YoutubeModule,
    MusicScoreModule,
    DailyFinalScoreModule,
    DailySummaryModule,
    SentimentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
