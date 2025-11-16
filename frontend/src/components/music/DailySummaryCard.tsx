'use client';

import { DailySummaryResponse } from '@/types/api';
import { useState } from 'react';

interface DailySummaryCardProps {
  summaries: DailySummaryResponse[];
  isLoading?: boolean;
}

export default function DailySummaryCard({ summaries, isLoading }: DailySummaryCardProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'youtube' | 'twitter' | 'combined'>('combined');
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 날짜를 직접 저장

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!summaries || summaries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📝 일별 여론 요약</h3>
        <p className="text-gray-500 text-sm">요약 데이터가 없습니다.</p>
      </div>
    );
  }

  // 선택된 플랫폼의 요약 가져오기 (가장 최근 데이터)
  const filteredSummaries = summaries.filter(s => s.platform === selectedPlatform);
  
  // 전체 날짜 목록 (모든 플랫폼 포함)
  const allDates = Array.from(new Set(summaries.map(s => s.summaryDate)))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  // 선택된 날짜가 없으면 9월 15일로 초기화 (없으면 최신 날짜)
  if (!selectedDate && allDates.length > 0) {
    const defaultDate = allDates.find(date => date === '2025-09-15') || allDates[0];
    setSelectedDate(defaultDate);
  }
  
  // 현재 날짜에 해당하는 데이터 찾기
  const currentSummary = filteredSummaries.find(s => s.summaryDate === selectedDate);
  const currentDateIndex = allDates.indexOf(selectedDate || '');
  
  // 날짜 이동 함수
  const goToPrevDate = () => {
    if (currentDateIndex < allDates.length - 1) {
      setSelectedDate(allDates[currentDateIndex + 1]);
    }
  };
  
  const goToNextDate = () => {
    if (currentDateIndex > 0) {
      setSelectedDate(allDates[currentDateIndex - 1]);
    }
  };
  
  // Combined 플랫폼일 경우, 개별 플랫폼 데이터로 감정 재계산
  const getAdjustedSentiment = (): string | null => {
    if (!currentSummary) return null;
    
    if (selectedPlatform === 'combined') {
      // 같은 날짜의 모든 youtube, twitter 데이터 가져오기
      const sameDate = currentSummary.summaryDate;
      const youtubeSummaries = summaries.filter(s => s.platform === 'youtube' && s.summaryDate === sameDate);
      const twitterSummaries = summaries.filter(s => s.platform === 'twitter' && s.summaryDate === sameDate);
      
      // 점수 변환 (positive: 1, neutral: 0, negative: -1)
      const sentimentToScore = (sentiment: string | null): number => {
        if (sentiment === 'positive') return 1;
        if (sentiment === 'negative') return -1;
        return 0;
      };
      
      // 모든 데이터의 평균 계산
      let totalScore = 0;
      let count = 0;
      
      // YouTube 데이터 평균
      youtubeSummaries.forEach(summary => {
        if (summary.sentiment) {
          totalScore += sentimentToScore(summary.sentiment);
          count++;
        }
      });
      
      // Twitter 데이터 평균
      twitterSummaries.forEach(summary => {
        if (summary.sentiment) {
          totalScore += sentimentToScore(summary.sentiment);
          count++;
        }
      });
      
      if (count === 0) return currentSummary.sentiment;
      
      const avgScore = totalScore / count;
      
      // 범위 조정: positive > 0.35, neutral: -0.35 ~ 0.35, negative < -0.35
      if (avgScore > 0.35) return 'positive';
      if (avgScore < -0.35) return 'negative';
      return 'neutral';
    }
    
    return currentSummary.sentiment;
  };
  
  const adjustedSentiment = getAdjustedSentiment();

  const getSentimentColor = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentEmoji = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😔';
      case 'neutral':
        return '😐';
      default:
        return '📊';
    }
  };

  const getSentimentText = (sentiment: string | null) => {
    switch (sentiment) {
      case 'positive':
        return '긍정적';
      case 'negative':
        return '부정적';
      case 'neutral':
        return '중립적';
      default:
        return '분석 중';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📝 일별 여론 요약
        </h3>
        {currentSummary && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevDate}
              disabled={currentDateIndex >= allDates.length - 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="이전 날짜"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-500 font-medium min-w-[100px] text-center">
              {new Date(selectedDate || '').toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
            </span>
            <button
              onClick={goToNextDate}
              disabled={currentDateIndex <= 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="다음 날짜"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 플랫폼 선택 탭 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedPlatform('combined')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            selectedPlatform === 'combined'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🌐 전체
        </button>
        <button
          onClick={() => setSelectedPlatform('youtube')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            selectedPlatform === 'youtube'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          📺 YouTube
        </button>
        <button
          onClick={() => setSelectedPlatform('twitter')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            selectedPlatform === 'twitter'
              ? 'bg-sky-500 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          🐦 Twitter
        </button>
      </div>

      {currentSummary ? (
        <div className="space-y-4">
          {/* 감정 배지 */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getSentimentColor(currentSummary.sentiment)}`}>
            <span className="text-lg">{getSentimentEmoji(currentSummary.sentiment)}</span>
            <span className="font-semibold">{getSentimentText(currentSummary.sentiment)}</span>
          </div>

          {/* 요약문 */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentSummary.summaryText || '요약문이 없습니다.'}
            </p>
          </div>

          {/* 키워드 */}
          {currentSummary.keywords && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-2 font-semibold">🔑 주요 키워드</p>
              <div className="flex flex-wrap gap-2">
                {currentSummary.keywords.split(',').map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 리뷰 수 */}
          {/* {currentSummary.reviewCount !== null && (
            <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <span className="text-sm text-gray-600">분석된 댓글/리뷰</span>
              <span className="text-lg font-bold text-blue-600">
                {currentSummary.reviewCount.toLocaleString()}개
              </span>
            </div>
          )} */}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 font-medium mb-1">선택한 플랫폼의 요약 데이터가 없습니다</p>
          <p className="text-xs text-gray-400">최근 30일 기준으로 {selectedPlatform === 'youtube' ? 'YouTube' : selectedPlatform === 'twitter' ? 'Twitter' : '전체'} 데이터가 수집되지 않았습니다.</p>
        </div>
      )}
    </div>
  );
}
