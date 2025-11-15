import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SentimentService } from '../service/Sentiment.service';
import { SentimentAnalysisResponse } from '../dto/SentimentAnalysisResponse.dto';

@ApiTags('sentiment')
@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Get('analyze/:videoId')
  @ApiOperation({ summary: '비디오 댓글 감성 분석 및 요약' })
  @ApiParam({ name: 'videoId', description: 'YouTube 비디오 ID' })
  @ApiResponse({
    status: 200,
    description: '감성 분석 결과',
    type: SentimentAnalysisResponse,
  })
  async analyzeVideoComments(
    @Param('videoId') videoId: string,
  ): Promise<SentimentAnalysisResponse> {
    try {
      return await this.sentimentService.analyzeVideoComments(videoId);
    } catch (error) {
      throw new HttpException(
        error.message || '감성 분석 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
