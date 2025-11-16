'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TrendChartProps {
  data: Array<{
    time: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const daysToShow = 7; // 1주 고정
  
  // 데이터를 역순으로 정렬 (최신 날짜가 먼저)
  const reversedData = [...data].reverse();
  
  // 초기 startIndex 계산: 2024-09-13 ~ 2024-09-19가 보이도록
  const getInitialIndex = () => {
    const targetStartDate = '09-13';
    const targetIndex = reversedData.findIndex(item => item.time.includes(targetStartDate));
    
    if (targetIndex >= 0) {
      return Math.max(0, targetIndex - 6);
    }
    return 0;
  };
  
  const [startIndex, setStartIndex] = useState(getInitialIndex());
  
  // 날짜 포맷팅 (YYYY-MM-DD만 표시)
  const formatXAxis = (value: string) => {
    return value.split(' ')[0].substring(5); // MM-DD만 표시
  };

  // 표시할 데이터 슬라이스 (최신 날짜부터) - 차트에서는 다시 역순으로 (왼쪽=과거, 오른쪽=최신)
  const displayData = reversedData.slice(startIndex, startIndex + daysToShow).reverse();
  
  // 이전/다음 이동 (왼쪽 화살표 = 과거로, 오른쪽 화살표 = 최신으로)
  const goToPrev = () => {
    if (startIndex + daysToShow < reversedData.length) {
      setStartIndex(startIndex + daysToShow);
    }
  };
  
  const goToNext = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - daysToShow));
    }
  };

  return (
    <div className="trend-chart w-full h-full">
      {/* 컨트롤 */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={startIndex + daysToShow >= reversedData.length}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="이전(과거)"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-gray-500 font-medium min-w-[80px] text-center">
            {displayData.length > 0 ? `${displayData[0]?.time.split(' ')[0].substring(5)} ~ ${displayData[displayData.length - 1]?.time.split(' ')[0].substring(5)}` : '데이터 없음'}
          </span>
          <button
            onClick={goToNext}
            disabled={startIndex <= 0}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="다음(최신)"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={displayData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <XAxis 
            dataKey="time" 
            stroke="#888" 
            tickFormatter={formatXAxis}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
          />
          <Line 
            type="monotone" 
            dataKey="positive" 
            stroke="#22c55e" 
            strokeWidth={3} 
            dot={false}
            name="positive"
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="#fbbf24" 
            strokeWidth={3} 
            dot={false}
            name="neutral"
          />
          <Line 
            type="monotone" 
            dataKey="negative" 
            stroke="#ef4444" 
            strokeWidth={3} 
            dot={false}
            name="negative"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;