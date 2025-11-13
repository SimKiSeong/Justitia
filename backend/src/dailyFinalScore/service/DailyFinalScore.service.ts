import { Injectable } from '@nestjs/common';
import {Between, DataSource} from 'typeorm';
import {DailyFinalScore} from "../entity/DailyFinalScore.entity";
import {AggregatedScoreDto} from "../dto/AggregatedScore.dto";
import {DailyFinalScoreResponseDto} from "../dto/DailyFinalScoreResponse.dto";

@Injectable()
export class DailyFinalScoreService {
  constructor(private readonly dataSource: DataSource) {}

  private getKstNow(): Date {
    const now = new Date();
    return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  }

  async findAll(startDate?: Date, endDate?: Date): Promise<DailyFinalScoreResponseDto[]> {
    const start = startDate || new Date('1970-01-01');
    const end = endDate || this.getKstNow();
    const entities = await this.dataSource.manager.find(DailyFinalScore,{where:{dateKst : Between(start, end)},take:1000});
    return entities.map(entity => this.toResponseDto(entity));
  }

  private toResponseDto(entity: DailyFinalScore): DailyFinalScoreResponseDto {
    return {
      id: entity.id,
      dateKst: entity.dateKst,
      query: entity.query,
      title: entity.title,
      viewCount: entity.viewCount,
      commentCount: entity.commentCount,
      likeCount: entity.likeCount,
      normView: entity.normView,
      pctComment: entity.pctComment,
      likeRatio: entity.likeRatio,
      sentimentTrueMean: entity.sentimentTrueMean,
      sentimentNorm: entity.sentimentNorm,
      socialNormMean: entity.socialNormMean,
      weights: entity.weights,
      dView: entity.dView,
      scenario: entity.scenario,
      score_5: entity.score_5,
      grade: entity.grade,
      timestampKst: entity.timestampKst,
    };
  }

  async findAggregated(term: string = '', startDate?: Date, endDate?: Date): Promise<AggregatedScoreDto[]> {
    const start = startDate || new Date('1970-01-01');
    const end = endDate || this.getKstNow();
    const scoreList = await this.dataSource.manager.find(DailyFinalScore,{where:{dateKst : Between(start, end)},take:1000});
    const aggregatedScoreList: AggregatedScoreDto[] = [];

    // query별로 그룹화
    const groupedByQuery = this.groupByQuery(scoreList);

    for (const [query, scores] of Object.entries(groupedByQuery)) {
      let groupedByPeriod: Map<string, DailyFinalScore[]>;

      if(term == 'daily'){
        groupedByPeriod = this.groupByDaily(scores);
      }else if(term == 'weekly'){
        groupedByPeriod = this.groupByWeekly(scores);
      }else if(term == 'monthly'){
        groupedByPeriod = this.groupByMonthly(scores);
      }else{
        continue;
      }

      // 각 기간별로 계산
      for (const periodScores of groupedByPeriod.values()) {
        const aggregated = this.calculateScore(periodScores, query, term);
        aggregatedScoreList.push(aggregated);
      }
    }

    return aggregatedScoreList;
  }

  private groupByQuery(scores: DailyFinalScore[]): Record<string, DailyFinalScore[]> {
    return scores.reduce((acc, score) => {
      if (!acc[score.query]) {
        acc[score.query] = [];
      }
      acc[score.query].push(score);
      return acc;
    }, {} as Record<string, DailyFinalScore[]>);
  }

  private groupByDaily(scores: DailyFinalScore[]): Map<string, DailyFinalScore[]> {
    const grouped = new Map<string, DailyFinalScore[]>();

    for (const score of scores) {
      const date = new Date(score.dateKst);
      const dateKey = date.toISOString().split('T')[0];
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(score);
    }

    return grouped;
  }

  private groupByWeekly(scores: DailyFinalScore[]): Map<string, DailyFinalScore[]> {
    const grouped = new Map<string, DailyFinalScore[]>();

    for (const score of scores) {
      const date = new Date(score.dateKst);
      const weekKey = this.getWeekKey(date);
      if (!grouped.has(weekKey)) {
        grouped.set(weekKey, []);
      }
      grouped.get(weekKey)!.push(score);
    }

    return grouped;
  }

  private groupByMonthly(scores: DailyFinalScore[]): Map<string, DailyFinalScore[]> {
    const grouped = new Map<string, DailyFinalScore[]>();

    for (const score of scores) {
      const date = new Date(score.dateKst);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!grouped.has(monthKey)) {
        grouped.set(monthKey, []);
      }
      grouped.get(monthKey)!.push(score);
    }

    return grouped;
  }

  private getWeekKey(date: Date): string {
    const year = date.getFullYear();
    const weekNumber = this.getWeekNumber(date);
    return `${year}-W${String(weekNumber).padStart(2, '0')}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  private calculateScore(scores: DailyFinalScore[], query: string, term: string): AggregatedScoreDto {
    const validScores = scores.filter(s => s !== null);
    const count = validScores.length;

    // 날짜 범위 계산
    const dates = validScores.map(s => new Date(s.dateKst)).sort((a, b) => a.getTime() - b.getTime());
    const startDate = dates[0] || new Date();
    const endDate = dates[dates.length - 1] || new Date();

    // Count 필드들 계산
    const viewCounts = validScores.map(s => s.viewCount ? BigInt(s.viewCount) : BigInt(0));
    const commentCounts = validScores.map(s => s.commentCount || 0);
    const likeCounts = validScores.map(s => s.likeCount || 0);

    const sumViewCount = viewCounts.reduce((sum, val) => sum + val, BigInt(0));
    const avgViewCount = count > 0 ? Number(sumViewCount) / count : 0;

    const sumCommentCount = commentCounts.reduce((sum, val) => sum + val, 0);
    const avgCommentCount = count > 0 ? sumCommentCount / count : 0;

    const sumLikeCount = likeCounts.reduce((sum, val) => sum + val, 0);
    const avgLikeCount = count > 0 ? sumLikeCount / count : 0;

    // Decimal 필드들 계산 (average만)
    const avgNormView = this.calculateAverage(validScores.map(s => s.normView));
    const avgPctComment = this.calculateAverage(validScores.map(s => s.pctComment));
    const avgLikeRatio = this.calculateAverage(validScores.map(s => s.likeRatio));
    const avgSentimentTrueMean = this.calculateAverage(validScores.map(s => s.sentimentTrueMean));
    const avgSentimentNorm = this.calculateAverage(validScores.map(s => s.sentimentNorm));
    const avgSocialNormMean = this.calculateAverage(validScores.map(s => s.socialNormMean));
    const avgDView = this.calculateAverage(validScores.map(s => s.dView));
    const avgScore5 = this.calculateAverage(validScores.map(s => s.score_5));

    // Grade 평균 계산
    const avgGrade = this.calculateAverageGrade(validScores.map(s => s.grade));

    return {
      startDate,
      endDate,
      query,
      term,
      avgViewCount,
      sumViewCount: Number(sumViewCount),
      avgCommentCount,
      sumCommentCount,
      avgLikeCount,
      sumLikeCount,
      avgNormView,
      avgPctComment,
      avgLikeRatio,
      avgSentimentTrueMean,
      avgSentimentNorm,
      avgSocialNormMean,
      avgDView,
      avgScore5,
      avgGrade,
      dataCount: count,
    };
  }

  private calculateAverage(values: (string | null)[]): number {
    const numbers = values
      .filter(v => v !== null && v !== undefined)
      .map(v => parseFloat(v as string))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
  }

  private calculateAverageGrade(grades: (string | null)[]): string {
    const gradeToNumber: Record<string, number> = {
      'A+': 4.5,
      'A': 4.0,
      'B+': 3.5,
      'B': 3.0,
      'C+': 2.5,
      'C': 2.0,
      'D+': 1.5,
      'D': 1.0,
      'F': 0.0,
    };

    const numberToGrade: Array<[number, string]> = [
      [4.25, 'A+'],
      [3.75, 'A'],
      [3.25, 'B+'],
      [2.75, 'B'],
      [2.25, 'C+'],
      [1.75, 'C'],
      [1.25, 'D+'],
      [0.5, 'D'],
      [0, 'F'],
    ];

    const numbers = grades
      .filter(g => g !== null && g !== undefined && gradeToNumber[g] !== undefined)
      .map(g => gradeToNumber[g as string]);

    if (numbers.length === 0) return 'N/A';

    const avg = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;

    for (const [threshold, grade] of numberToGrade) {
      if (avg >= threshold) {
        return grade;
      }
    }

    return 'F';
  }
}