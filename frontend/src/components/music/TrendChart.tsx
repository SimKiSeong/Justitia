'use client';

import React from 'react';
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
  // 날짜 포맷팅 (YYYY-MM-DD만 표시)
  const formatXAxis = (value: string) => {
    return value.split(' ')[0].substring(5); // MM-DD만 표시
  };

  return (
    <div className="trend-chart w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
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