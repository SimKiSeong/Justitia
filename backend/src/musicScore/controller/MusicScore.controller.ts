import { Controller, Get } from '@nestjs/common';
import { MusicScoreFnlService } from '../service/music-score-fnl.service';
import { MusicScoreFnl } from '../entity/MusicScoreFnl.entity';

@Controller('music-score-fnl')
export class MusicScoreController {
  constructor(private readonly musicScoreFnlService: MusicScoreFnlService) {}

  @Get()
  async findAll(): Promise<MusicScoreFnl[]> {
    return this.musicScoreFnlService.findAll();
  }
}