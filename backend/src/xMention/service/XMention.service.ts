import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { XMentionScore } from '../entity/XMentionScore.entity';
import { XMentionDaily } from '../entity/XMentionDaily.entity';
import { XMentionRaw } from '../entity/XMentionRaw.entity';

@Injectable()
export class XMentionService {
  constructor(private readonly dataSource: DataSource) {}

  async findAllScores(): Promise<XMentionScore[]> {
    return this.dataSource.manager.find(XMentionScore);
  }

  async findAllDaily(): Promise<XMentionDaily[]> {
    return this.dataSource.manager.find(XMentionDaily);
  }

  async findAllRaw(): Promise<XMentionRaw[]> {
    return this.dataSource.manager.find(XMentionRaw);
  }
}