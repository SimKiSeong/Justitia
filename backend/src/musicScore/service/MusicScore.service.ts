import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MusicScoreFnl } from '../entity/MusicScoreFnl.entity';

@Injectable()
export class MusicScoreService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<MusicScoreFnl[]> {
    return this.dataSource.manager.find(MusicScoreFnl);
  }
}