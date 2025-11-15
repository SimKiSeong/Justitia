import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SentimentController } from './controller/Sentiment.controller';
import { SentimentService } from './service/Sentiment.service';
import { SimpleSentimentService } from './service/SimpleSentiment.service';
import { YoutubeCommentsScore } from '../youtube/entity/YoutubeCommentsScore.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([YoutubeCommentsScore]),
  ],
  controllers: [SentimentController],
  providers: [SentimentService, SimpleSentimentService],
  exports: [SentimentService],
})
export class SentimentModule {}
