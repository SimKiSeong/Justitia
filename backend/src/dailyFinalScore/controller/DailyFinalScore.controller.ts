import {Controller, Get, Query} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {DailyFinalScoreService} from "../service/DailyFinalScore.service";
import {DailyFinalScoreResponseDto} from "../dto/DailyFinalScoreResponse.dto";
import {AggregatedScoreDto} from "../dto/AggregatedScore.dto";
import {TermType} from "../dto/Term.enum";

@ApiTags('Daily Final Score')
@Controller('daily-final-score')
export class DailyFinalScoreController {
  constructor(private readonly dailyFinalScoreService: DailyFinalScoreService) {}

  @Get()
  @ApiOperation({ summary: '일별 최종 점수 조회', description: '기간 내의 모든 일별 최종 점수 데이터를 조회합니다.' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: '시작 날짜 (기본값: 1970-01-01)' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: '종료 날짜 (기본값: 현재 KST)' })
  @ApiResponse({ status: 200, description: '성공', type: [DailyFinalScoreResponseDto] })
  async findAll(
      @Query('startDate') startDate?: Date,
      @Query('endDate') endDate?: Date,
  ): Promise<DailyFinalScoreResponseDto[]> {
    return this.dailyFinalScoreService.findAll(startDate, endDate);
  }

  @Get('aggregated')
  @ApiOperation({
    summary: '집계된 점수 조회',
    description: '기간별(일/주/월)로 집계된 점수 데이터를 조회합니다. query별로 그룹화되어 통계값을 반환합니다.'
  })
  @ApiQuery({
    name: 'term',
    required: true,
    enum: TermType,
    description: '집계 기간 타입 (daily: 일별, weekly: 주별, monthly: 월별)'
  })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: '시작 날짜 (기본값: 1970-01-01)' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: '종료 날짜 (기본값: 현재 KST)' })
  @ApiResponse({ status: 200, description: '성공', type: [AggregatedScoreDto] })
  async findAggregated(
      @Query('term') term: string,
      @Query('startDate') startDate?: Date,
      @Query('endDate') endDate?: Date,
  ): Promise<AggregatedScoreDto[]> {
    return this.dailyFinalScoreService.findAggregated(term, startDate, endDate);
  }
}