import { Module } from '@nestjs/common';
import { XMentionController } from './controller/XMention.controller';
import { XMentionService } from './service/XMention.service';

@Module({
  controllers: [XMentionController],
  providers: [XMentionService],
  exports: [XMentionService],
})
export class XMentionModule {}