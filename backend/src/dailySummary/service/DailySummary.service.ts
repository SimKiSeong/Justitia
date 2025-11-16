import { Injectable } from '@nestjs/common';
import {Between, DataSource} from 'typeorm';
import {DailySummary} from "../entity/DailySummary.entity";
import {DailySummaryResponseDto} from "../dto/DailySummaryResponse.dto";

@Injectable()
export class DailySummaryService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(startDate?: Date, endDate?: Date, platform?: string): Promise<DailySummaryResponseDto[]> {
    const start = startDate || new Date('1970-01-01');
    const end = endDate || new Date();

    const whereCondition: any = {
      summaryDate: Between(start, end)
    };

    if (platform) {
      whereCondition.platform = platform;
    }

    const entities = await this.dataSource.manager.find(DailySummary, {
      where: whereCondition,
      order: {
        summaryDate: 'DESC',
        platform: 'ASC'
      },
      take: 1000
    });

    return entities.map(entity => this.toResponseDto(entity));
  }

  private toResponseDto(entity: DailySummary): DailySummaryResponseDto {
    return {
      id: entity.id,
      summaryDate: entity.summaryDate,
      platform: entity.platform,
      summaryText: entity.summaryText,
      sentiment: entity.sentiment,
      keywords: entity.keywords,
      reviewCount: entity.reviewCount,
      createdAt: entity.createdAt,
    };
  }
}