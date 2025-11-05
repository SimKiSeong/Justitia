import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { XMentionModule } from './xMention/XMention.module';
import { YoutubeModule } from './youtube/Youtube.module';
import {MusicScoreModule} from "./musicScore/MusicScore.module";

@Module({
  imports: [DBModule, XMentionModule, YoutubeModule, MusicScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
