import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SimpleSentimentService {
  private readonly logger = new Logger(SimpleSentimentService.name);

  // 감성 키워드 사전
  private readonly positiveKeywords = [
    '좋', '최고', '짱', '대박', '멋', '예쁘', '이쁘', '사랑', '완벽', '최애', '감동',
    '굿', 'good', 'great', 'love', 'amazing', 'perfect', 'beautiful', 'awesome',
    'best', 'nice', 'wonderful', 'excellent', 'fantastic', '👍', '❤️', '💕', '😍',
    '🔥', '✨', '💯', '👏', '😊', '😄', '😁', '🥰',
  ];

  private readonly negativeKeywords = [
    '싫', '별로', '최악', '안좋', '그만', '실망', '아쉽', '별루', '노잼',
    'bad', 'hate', 'ugly', 'terrible', 'awful', 'worst', 'boring', 'disappointed',
    '👎', '😠', '😡', '🤮', '💩', '😢', '😭', '😞',
  ];

  /**
   * 간단한 키워드 기반 감성 분석
   */
  analyzeSentiment(text: string): {
    label: 'positive' | 'neutral' | 'negative';
    score: number;
    positive: number;
    neutral: number;
    negative: number;
  } {
    if (!text || text.length < 2) {
      return {
        label: 'neutral',
        score: 0.5,
        positive: 0.33,
        neutral: 0.34,
        negative: 0.33,
      };
    }

    const lowerText = text.toLowerCase();
    
    // 긍정/부정 키워드 매칭
    let positiveCount = 0;
    let negativeCount = 0;

    this.positiveKeywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        positiveCount++;
      }
    });

    this.negativeKeywords.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        negativeCount++;
      }
    });

    // 느낌표 많으면 긍정 가산점
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount >= 2) positiveCount += 1;

    // 물음표 많으면 중립/부정
    const questionCount = (text.match(/\?/g) || []).length;
    if (questionCount >= 2) negativeCount += 0.5;

    // 점수 계산
    let label: 'positive' | 'neutral' | 'negative' = 'neutral';
    let positive = 0.33;
    let neutral = 0.34;
    let negative = 0.33;

    if (positiveCount > negativeCount) {
      label = 'positive';
      positive = 0.6 + (positiveCount * 0.1);
      negative = 0.2;
      neutral = 1 - positive - negative;
    } else if (negativeCount > positiveCount) {
      label = 'negative';
      negative = 0.6 + (negativeCount * 0.1);
      positive = 0.2;
      neutral = 1 - positive - negative;
    }

    // 정규화
    const total = positive + neutral + negative;
    positive /= total;
    neutral /= total;
    negative /= total;

    const score = label === 'positive' ? positive : (label === 'negative' ? negative : neutral);

    return { label, score, positive, neutral, negative };
  }

  /**
   * 키워드 추출 (빈도수 기반)
   */
  extractKeywords(texts: string[]): string[] {
    const wordFreq: { [key: string]: number } = {};
    const stopWords = new Set([
      '이', '그', '저', '것', '수', '등', '및', '를', '을', '가', '이', '은', '는', '의', '에', '도', '와', '과',
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'are', 'was', 'were',
      'this', 'that', 'it', 'be', 'have', 'has', 'had', 'do', 'does', 'did',
      // HTML 태그 및 특수문자
      'br', 'div', 'span', 'img', 'href', 'http', 'https', 'www', 'com',
      // 일반적인 단어
      'man', 'woman', 'people', 'like', 'just', 'get', 'so', 'my', 'me', 'you', 'your',
    ]);

    texts.forEach((text) => {
      // 한글, 영문만 추출
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

    // 빈도수 순으로 정렬하여 상위 15개 반환
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map((entry) => entry[0]);
  }

  /**
   * 요약 생성 (통계 기반)
   */
  generateSummary(
    stats: { positive: number; neutral: number; negative: number; total: number },
    keywords: string[],
  ): string {
    const { positive, neutral, negative, total } = stats;
    
    if (total === 0) {
      return '분석할 댓글이 없습니다.';
    }

    const posPercent = Math.round((positive / total) * 100);
    const negPercent = Math.round((negative / total) * 100);
    const neuPercent = Math.round((neutral / total) * 100);
    
    let sentiment = '중립적';
    let detail = '';
    
    if (posPercent > 70) {
      sentiment = '매우 긍정적';
      detail = '대부분의 반응이 긍정적입니다.';
    } else if (posPercent > 50) {
      sentiment = '긍정적';
      detail = '전반적으로 좋은 평가를 받고 있습니다.';
    } else if (negPercent > 50) {
      sentiment = '부정적';
      detail = '개선이 필요해 보입니다.';
    } else if (negPercent > 30) {
      sentiment = '다소 부정적';
      detail = '일부 부정적인 의견이 있습니다.';
    } else if (neuPercent > 60) {
      sentiment = '중립적';
      detail = '긍정이 부정보다 많습니다.';
    } else {
      sentiment = '중립적';
      detail = '다양한 의견이 혼재되어 있습니다.';
    }
    
    return `총 ${total.toLocaleString()}개의 댓글을 분석한 결과, ${posPercent}%가 긍정, ${neuPercent}%가 중립, ${negPercent}%가 부정적 반응을 보였습니다. 전반적으로 ${sentiment}인 분위기이며, ${detail}`;
  }
}
