import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { XMentionService } from '../service/XMention.service';
import { XMentionScore } from '../entity/XMentionScore.entity';
import { XMentionDaily } from '../entity/XMentionDaily.entity';
import { XMentionRaw } from '../entity/XMentionRaw.entity';

@ApiTags('X (Twitter) Mention')
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