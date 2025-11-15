import { Injectable, Logger } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';
import { ConfigService } from '@nestjs/config';
import { franc } from 'franc-min';

@Injectable()
export class HuggingFaceService {
  private readonly logger = new Logger(HuggingFaceService.name);
  private hf: HfInference;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('HUGGINGFACE_API_KEY');
    this.hf = new HfInference(apiKey);
  }

  /**
   * 텍스트 감성 분석
   * @param text 분석할 텍스트
   * @returns 감성 점수 { positive, neutral, negative }
   */
  async analyzeSentiment(text: string): Promise<{
    label: string;
    score: number;
    positive: number;
    neutral: number;
    negative: number;
  }> {
    try {
      // 텍스트가 너무 짧으면 중립으로 처리
      if (!text || text.length < 3) {
        return {
          label: 'neutral',
          score: 0.5,
          positive: 0.33,
          neutral: 0.34,
          negative: 0.33,
        };
      }

      // 여러 모델 시도 (안정적인 순서대로)
      const models = [
        'distilbert-base-uncased-finetuned-sst-2-english',
        'nlptown/bert-base-multilingual-uncased-sentiment',
        'cardiffnlp/twitter-roberta-base-sentiment-latest',
      ];

      let result: any;
      let modelUsed = '';

      for (const model of models) {
        try {
          this.logger.log(`모델 시도: ${model}`);
          result = await this.hf.textClassification({
            model,
            inputs: text.substring(0, 512),
            parameters: {
              wait_for_model: true, // 모델 로딩 대기
            },
          });
          modelUsed = model;
          this.logger.log(`모델 성공: ${model}`);
          break;
        } catch (modelError) {
          this.logger.warn(`모델 ${model} 실패, 다음 모델 시도`);
          continue;
        }
      }

      if (!result) {
        throw new Error('모든 모델 시도 실패');
      }

      // 결과 정규화
      const scores = {
        positive: 0,
        neutral: 0,
        negative: 0,
      };

      // 모델별로 다른 라벨 형식 처리
      result.forEach((item: any) => {
        const label = item.label.toLowerCase();
        
        // POSITIVE/NEGATIVE 형식
        if (label.includes('pos')) {
          scores.positive = item.score;
        } else if (label.includes('neu')) {
          scores.neutral = item.score;
        } else if (label.includes('neg')) {
          scores.negative = item.score;
        }
        // 5-star 형식 (1-5)
        else if (label.includes('5') || label.includes('4')) {
          scores.positive = item.score;
        } else if (label.includes('3')) {
          scores.neutral = item.score;
        } else if (label.includes('2') || label.includes('1')) {
          scores.negative = item.score;
        }
      });

      // 점수 정규화 (합이 1이 되도록)
      const total = scores.positive + scores.neutral + scores.negative;
      if (total > 0) {
        scores.positive /= total;
        scores.neutral /= total;
        scores.negative /= total;
      }

      // 최고 점수 라벨 결정
      let label = 'neutral';
      let maxScore = scores.neutral;
      if (scores.positive > maxScore) {
        label = 'positive';
        maxScore = scores.positive;
      }
      if (scores.negative > maxScore) {
        label = 'negative';
        maxScore = scores.negative;
      }

      return {
        label,
        score: maxScore,
        ...scores,
      };
    } catch (error) {
      this.logger.error(`모든 감성 분석 시도 실패: ${error.message}`);
      throw error; // AI 필수이므로 에러를 던짐
    }
  }

  /**
   * 댓글 배치 요약 생성
   * @param comments 댓글 배열
   * @returns 요약 텍스트
   */
  async summarizeComments(comments: string[]): Promise<string> {
    try {
      // 댓글을 합쳐서 입력 텍스트 생성 (최대 1000자)
      const combinedText = comments
        .slice(0, 50) // 최대 50개 댓글
        .join(' ')
        .substring(0, 1000);

      // 요약 생성
      const result = await this.hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: combinedText,
        parameters: {
          max_length: 150,
          min_length: 50,
        },
      });

      return result.summary_text || '요약을 생성할 수 없습니다.';
    } catch (error) {
      this.logger.error(`요약 생성 실패: ${error.message}`);
      return '댓글 요약을 생성하는 중 오류가 발생했습니다.';
    }
  }

  /**
   * 키워드 추출 (간단한 빈도수 기반)
   * @param texts 텍스트 배열
   * @returns 주요 키워드 배열
   */
  extractKeywords(texts: string[]): string[] {
    const wordFreq: { [key: string]: number } = {};
    const stopWords = new Set([
      '이', '그', '저', '것', '수', '등', '및', '를', '을', '가', '이', '은', '는',
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    ]);

    texts.forEach((text) => {
      // 단어 추출 (한글, 영문, 숫자만)
      const words = text.match(/[\w가-힣]+/g) || [];
      words.forEach((word) => {
        const lowerWord = word.toLowerCase();
        if (
          lowerWord.length > 1 &&
          !stopWords.has(lowerWord) &&
          !/^\d+$/.test(lowerWord)
        ) {
          wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
        }
      });
    });

    // 빈도수 순으로 정렬하여 상위 10개 반환
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map((entry) => entry[0]);
  }

  /**
   * 언어 감지
   * @param text 텍스트
   * @returns 언어 코드 ('ko', 'en', 'multilingual')
   */
  private detectLanguage(text: string): string {
    try {
      const lang = franc(text);
      if (lang === 'kor') return 'ko';
      if (lang === 'eng') return 'en';
      return 'multilingual';
    } catch {
      return 'multilingual';
    }
  }
}
