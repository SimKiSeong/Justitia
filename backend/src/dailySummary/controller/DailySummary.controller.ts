import {Controller, Get, Query} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DailySummaryService} from "../service/DailySummary.service";
import {DailySummaryResponseDto} from "../dto/DailySummaryResponse.dto";

@ApiTags('Daily Summary')
@Controller('daily-summary')
export class DailySummaryController {
  constructor(private readonly dailySummaryService: DailySummaryService) {}

  @Get()
  @ApiOperation({ summary: '일별 요약 조회', description: '기간 내의 모든 일별 요약 데이터를 조회합니다.' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: '시작 날짜 (기본값: 1970-01-01)' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: '종료 날짜 (기본값: 현재 날짜)' })
  @ApiQuery({ name: 'platform', required: false, type: String, description: '플랫폼 필터 (예: youtube, twitter 등)' })
  @ApiResponse({ status: 200, description: '성공', type: [DailySummaryResponseDto] })
  async findAll(
      @Query('startDate') startDate?: Date,
      @Query('endDate') endDate?: Date,
      @Query('platform') platform?: string,
  ): Promise<DailySummaryResponseDto[]> {
    return this.dailySummaryService.findAll(startDate, endDate, platform);
  }
}