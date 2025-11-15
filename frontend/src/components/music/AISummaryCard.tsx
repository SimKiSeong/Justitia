'use client';

interface AISummaryCardProps {
  summary: string;
  isLoading?: boolean;
}

export default function AISummaryCard({ summary, isLoading }: AISummaryCardProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-purple-200 rounded w-1/4"></div>
            <div className="h-3 bg-purple-200 rounded"></div>
            <div className="h-3 bg-purple-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 border border-purple-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            댓글 분석 요약
            <span className="text-xs font-normal text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              자동 생성
            </span>
          </h3>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
}
