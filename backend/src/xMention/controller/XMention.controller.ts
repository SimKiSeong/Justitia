import { Controller, Get } from '@nestjs/common';
import { XMentionService } from '../service/xMention.service';
import { XMentionScore } from '../entity/XMentionScore.entity';
import { XMentionDaily } from '../entity/XMentionDaily.entity';
import { XMentionRaw } from '../entity/XMentionRaw.entity';

@Controller('x-mention')
export class XMentionController {
  constructor(private readonly xMentionService: XMentionService) {}

  @Get('score')
  async findAllScores(): Promise<XMentionScore[]> {
    return this.xMentionService.findAllScores();
  }

  @Get('daily')
  async findAllDaily(): Promise<XMentionDaily[]> {
    return this.xMentionService.findAllDaily();
  }

  @Get('raw')
  async findAllRaw(): Promise<XMentionRaw[]> {
    return this.xMentionService.findAllRaw();
  }
}