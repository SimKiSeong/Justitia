import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicScoreFnl } from '../entity/MusicScoreFnl.entity';
import {MusicScoreService} from "../service/MusicScore.service";

@ApiTags('Music Score')
@Controller('music-score-fnl')
export class MusicScoreController {
  constructor(private readonly musicScoreService: MusicScoreService) {}

  @Get()
  async findAll(): Promise<MusicScoreFnl[]> {
    return this.musicScoreService.findAll();
  }
}