'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import RatingCard from '@/components/music/RatingCard';
import OverallScore from '@/components/music/OverallScore';
import SentimentChart from '@/components/music/SentimentChart';
import SentimentSummary from '@/components/music/SentimentSummary';
import TrendChart from '@/components/music/TrendChart';
import CommentList from '@/components/music/CommentList';
import KeywordCloud from '@/components/music/KeywordCloud';
import AISummaryCard from '@/components/music/AISummaryCard';
import DailySummaryCard from '@/components/music/DailySummaryCard';
import { mockMusicData } from '../mockData';
import { MusicAnalysis } from '../types';
import { youtubeAPI, sentimentUtils, sentimentAPI, dailySummaryAPI } from '@/lib/api';
import { YoutubeCommentScore, CommentWithSentiment, SentimentAnalysis, SentimentTrend, AISentimentAnalysis, DailySummaryResponse } from '@/types/api';

export default function MusicAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [musicData, setMusicData] = useState<MusicAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'ratings' | 'stats' | 'sentiment'>('ratings');
  
  // 실제 API 데이터 상태
  const [comments, setComments] = useState<CommentWithSentiment[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis>({ positive: 0, neutral: 0, negative: 0, total: 0 });
  const [trendData, setTrendData] = useState<SentimentTrend[]>([]);
  
  // AI 분석 데이터 상태
  const [aiAnalysis, setAiAnalysis] = useState<AISentimentAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // Daily Summary 데이터 상태
  const [dailySummaries, setDailySummaries] = useState<DailySummaryResponse[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = mockMusicData[resolvedParams.id] || mockMusicData['1'];
    setMusicData(data);
  }, [resolvedParams.id]);

  // API 데이터 로드
  useEffect(() => {
    async function loadSentimentData() {
      try {
        setLoading(true);
        setError(null);
        
        // YouTube 댓글 데이터 가져오기
        const commentsData = await youtubeAPI.getCommentsWithScore();
        
        // 감성 라벨 추가
        const commentsWithLabels = sentimentUtils.addSentimentLabels(commentsData);
        setComments(commentsWithLabels);
        
        // 감성 분석 집계
        const analysis = sentimentUtils.analyzeSentiment(commentsData);
        setSentimentAnalysis(analysis);
        
        // 트렌드 데이터 생성 (일별)
        const trend = sentimentUtils.generateDailyTrend(commentsData);
        setTrendData(trend);
        
      } catch (err) {
        console.error('감성 데이터 로드 실패:', err);
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    
    loadSentimentData();
  }, []);

  // AI 분석 데이터 로드 (별도 호출 - 느릴 수 있음)
  useEffect(() => {
    async function loadAIAnalysis() {
      try {
        setAiLoading(true);
        setAiError(null);
        
        console.log('🔍 AI 분석 시작...');
        
        // 먼저 비디오 목록 가져오기
        const videos = await youtubeAPI.getVideos();
        console.log('📹 비디오 목록:', videos);
        
        if (videos.length === 0) {
          setAiError('비디오 데이터가 없습니다.');
          return;
        }
        
        // 첫 번째 비디오의 ID 사용
        const videoId = videos[0].videoId;
        console.log('🎯 선택된 videoId:', videoId);
        
        const analysis = await sentimentAPI.analyzeVideo(videoId);
        console.log('✅ AI 분석 완료:', analysis);
        
        setAiAnalysis(analysis);
        
      } catch (err) {
        console.error('❌ AI 분석 실패:', err);
        setAiError(err instanceof Error ? err.message : 'AI 분석 중 오류가 발생했습니다.');
      } finally {
        setAiLoading(false);
      }
    }
    
    loadAIAnalysis();
  }, []);

  // Daily Summary 데이터 로드
  useEffect(() => {
    async function loadDailySummary() {
      try {
        setSummaryLoading(true);
        
        // 11월 1일까지 데이터 가져오기 (트위터 데이터 있는 기간)
        const summaries = await dailySummaryAPI.get({
          endDate: '2025-11-01',
        });
        
        console.log('📝 Daily Summary 로드 성공:', summaries);
        setDailySummaries(summaries);
        
      } catch (err) {
        console.error('❌ Daily Summary 로드 실패:', err);
      } finally {
        setSummaryLoading(false);
      }
    }
    
    loadDailySummary();
  }, []);

  if (!musicData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const { music, ratings, overallScore, sentimentScore, weeklyPlays, totalPlays, currentRank, peakRank, weeksOnChart } = musicData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-6">
          <a
            href="/chart"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">차트 목록으로</span>
          </a>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 4.026A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
              </svg>
            </button>
            <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 mx-auto md:mx-0">
                <Image
                  src={music.albumCover}
                  alt={music.album}
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                  {music.genre}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{music.title}</h1>
                <p className="text-xl text-gray-600 mb-1">{music.artist}</p>
                <p className="text-md text-gray-500">{music.album}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">현재 순위</p>
                  <p className="text-2xl font-bold text-gray-900">#{currentRank}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">최고 순위</p>
                  <p className="text-2xl font-bold text-green-600">#{peakRank}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">차트 진입</p>
                  <p className="text-2xl font-bold text-gray-900">{weeksOnChart}주</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">발매일</p>
                  <p className="text-sm font-bold text-gray-900">{music.releaseDate}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-2">
                  <div>
                    <p className="text-xs text-gray-500">주간 재생</p>
                    <p className="text-sm font-bold text-gray-900">{(weeklyPlays / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 rounded-lg px-4 py-2">
                  <div>
                    <p className="text-xs text-gray-500">누적 재생</p>
                    <p className="text-sm font-bold text-gray-900">{(totalPlays / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
                onClick={() => setActiveTab('sentiment')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                    activeTab === 'sentiment'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              감성 분석
            </button>
            <button
                onClick={() => setActiveTab('ratings')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                    activeTab === 'ratings'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              플랫폼별 평점
            </button>
            <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 py-4 px-6 font-medium transition-colors ${
                    activeTab === 'stats'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              통계 분석
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <OverallScore score={overallScore} sentimentScore={sentimentScore}/>
          </div>

          <div className="lg:col-span-2">
            {activeTab === 'ratings' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ratings.map((rating, index) => (
                  <RatingCard key={index} rating={rating} />
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">상세 통계</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">일일 평균 재생수</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(weeklyPlays / 7 / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">예상 월간 재생수</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(weeklyPlays * 4.3 / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sentiment' && (
              <div className="space-y-6">
                {loading ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">감성 분석 데이터 로딩 중...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-semibold mb-2">데이터 로드 실패</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                ) : (
                  <>
                    {/* Daily Summary 카드 (최상단) */}
                    <DailySummaryCard summaries={dailySummaries} isLoading={summaryLoading} />

                    {/* 감성 요약 카드 */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">감성 요약</h3>
                      
                      {/* AI 댓글 분석 요약 */}
                      <div className="mb-6">
                        {aiLoading ? (
                          <AISummaryCard summary="" isLoading={true} />
                        ) : aiError ? (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
                            AI 요약 생성 실패: {aiError}
                          </div>
                        ) : aiAnalysis ? (
                          <AISummaryCard summary={aiAnalysis.summary} />
                        ) : null}
                      </div>
                      
                      <SentimentSummary
                        positive={aiAnalysis ? aiAnalysis.sentiment.positive : sentimentAnalysis.positive}
                        neutral={aiAnalysis ? aiAnalysis.sentiment.neutral : sentimentAnalysis.neutral}
                        negative={aiAnalysis ? aiAnalysis.sentiment.negative : sentimentAnalysis.negative}
                        total={aiAnalysis ? aiAnalysis.sentiment.total : sentimentAnalysis.total}
                      />
                    </div>

                    {/* 감성 차트와 트렌드 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl shadow-md p-6">
                        <SentimentChart
                          positive={aiAnalysis ? aiAnalysis.sentiment.positive : sentimentAnalysis.positive}
                          neutral={aiAnalysis ? aiAnalysis.sentiment.neutral : sentimentAnalysis.neutral}
                          negative={aiAnalysis ? aiAnalysis.sentiment.negative : sentimentAnalysis.negative}
                        />
                      </div>
                      
                      <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-12 text-center">
                          날짜별 감성 트렌드
                        
                        </h3>
                        {trendData.length > 0 ? (
                          <TrendChart data={trendData} />
                        ) : (
                          <div className="text-center text-gray-500 py-12">
                            트렌드 데이터가 없습니다.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 댓글 목록 */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">댓글 목록</h3>
                      <CommentList comments={aiAnalysis ? aiAnalysis.comments.map(c => ({
                        ...c,
                        videoId: 'temp',
                        parentId: null,
                        updatedAt: c.publishedAt,
                        collectedAtLocal: c.publishedAt,
                        relevance: null,
                      })) : comments} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
