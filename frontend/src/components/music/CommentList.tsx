'use client';

import { useState } from 'react';
import { CommentWithSentiment, SentimentLabel } from '@/types/api';

interface CommentListProps {
  comments: CommentWithSentiment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const [filter, setFilter] = useState<SentimentLabel | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 필터링된 댓글
  const filteredComments = filter === 'all' 
    ? comments 
    : comments.filter(c => c.sentimentLabel === filter);

  // 페이지네이션
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComments = filteredComments.slice(startIndex, endIndex);

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = (newFilter: SentimentLabel | 'all') => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // 감성별 스타일 정의
  const getSentimentStyle = (sentiment: SentimentLabel) => {
    switch (sentiment) {
      case 'positive':
        return {
          borderColor: 'border-l-green-500',
          bgColor: 'bg-green-50',
          badgeColor: 'bg-green-100 text-green-700',
          icon: '😊'
        };
      case 'neutral':
        return {
          borderColor: 'border-l-gray-400',
          bgColor: 'bg-gray-50',
          badgeColor: 'bg-gray-100 text-gray-700',
          icon: '😐'
        };
      case 'negative':
        return {
          borderColor: 'border-l-red-500',
          bgColor: 'bg-red-50',
          badgeColor: 'bg-red-100 text-red-700',
          icon: '😞'
        };
    }
  };

  // 날짜 포맷팅
  const formatDate = (date: Date | null): string => {
    if (!date) return '날짜 없음';
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 필터 버튼 스타일
  const getFilterButtonStyle = (filterType: SentimentLabel | 'all') => {
    const isActive = filter === filterType;
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
    
    if (filterType === 'all') {
      return `${baseStyle} ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`;
    }
    
    const colors = {
      positive: isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200',
      neutral: isActive ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      negative: isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200',
    };
    
    return `${baseStyle} ${colors[filterType]}`;
  };

  return (
    <div className="w-full">
      {/* 필터 버튼 */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => handleFilterChange('all')}
          className={getFilterButtonStyle('all')}
        >
          전체 ({comments.length})
        </button>
        <button
          onClick={() => handleFilterChange('positive')}
          className={getFilterButtonStyle('positive')}
        >
          😊 긍정 ({comments.filter(c => c.sentimentLabel === 'positive').length})
        </button>
        <button
          onClick={() => handleFilterChange('neutral')}
          className={getFilterButtonStyle('neutral')}
        >
          😐 중립 ({comments.filter(c => c.sentimentLabel === 'neutral').length})
        </button>
        <button
          onClick={() => handleFilterChange('negative')}
          className={getFilterButtonStyle('negative')}
        >
          😞 부정 ({comments.filter(c => c.sentimentLabel === 'negative').length})
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {currentComments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">댓글이 없습니다.</p>
          </div>
        ) : (
          currentComments.map((comment) => {
            const style = getSentimentStyle(comment.sentimentLabel);
            return (
              <div
                key={comment.commentId}
                className={`border-l-4 ${style.borderColor} ${style.bgColor} rounded-r-lg p-4 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{style.icon}</span>
                    <span className="font-semibold text-gray-800">
                      {comment.authorDisplayName || '익명'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${style.badgeColor}`}>
                      {comment.sentimentLabel === 'positive' ? '긍정' : 
                       comment.sentimentLabel === 'negative' ? '부정' : '중립'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{formatDate(comment.publishedAt)}</span>
                    {comment.likeCount !== null && comment.likeCount > 0 && (
                      <span className="flex items-center gap-1">
                        👍 {comment.likeCount.toLocaleString('ko-KR')}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {comment.text || '내용 없음'}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            이전
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // 현재 페이지 근처만 표시
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return <span key={page} className="px-2 py-2 text-gray-500">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            다음
          </button>
        </div>
      )}

      {/* 결과 카운트 */}
      <div className="mt-4 text-center text-sm text-gray-500">
        총 {filteredComments.length}개의 댓글 중 {startIndex + 1}-{Math.min(endIndex, filteredComments.length)}개 표시
      </div>
    </div>
  );
}
