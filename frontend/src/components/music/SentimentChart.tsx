'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SentimentChartProps {
  positive: number;
  neutral: number;
  negative: number;
}

export default function SentimentChart({ positive, neutral, negative }: SentimentChartProps) {
  const total = positive + neutral + negative;

  // 퍼센트 계산 함수
  const calculatePercentage = (value: number): string => {
    if (total === 0) return '0.0';
    return ((value / total) * 100).toFixed(1);
  };

  // recharts용 데이터 변환
  const data = [
    { 
      name: '긍정', 
      value: positive, 
      color: '#22c55e',
      percentage: calculatePercentage(positive)
    },
    { 
      name: '중립', 
      value: neutral, 
      color: '#fbbf24',
      percentage: calculatePercentage(neutral)
    },
    { 
      name: '부정', 
      value: negative, 
      color: '#ef4444',
      percentage: calculatePercentage(negative)
    }
  ];

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 shadow-xl rounded-lg border-2" style={{ borderColor: data.color }}>
          <p className="font-bold text-lg mb-1" style={{ color: data.color }}>
            {data.name}
          </p>
          <p className="text-gray-700 font-semibold">
            {data.value.toLocaleString('ko-KR')}개
          </p>
          <p className="text-gray-600">
            {data.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  // 커스텀 라벨 (차트 안에 퍼센트 표시)
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {percentage}%
      </text>
    );
  };

  return (
    <div className="rounded-xl ">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        감성 분포
      </h3>

      {/* 차트 */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 중앙 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-gray-900">
            {total.toLocaleString('ko-KR')}
          </span>
          <span className="text-sm text-gray-500 mt-1">총 댓글</span>
        </div>
      </div>

      {/* 범례 */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {item.name} {item.percentage}%
            </span>
          </div>
        ))}
      </div>


      {/* 상세 통계  */}
      {/*
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {positive.toLocaleString('ko-KR')}
            </div>
            <div className="text-xs text-gray-500 mt-1">긍정 댓글</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {neutral.toLocaleString('ko-KR')}
            </div>
            <div className="text-xs text-gray-500 mt-1">중립 댓글</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {negative.toLocaleString('ko-KR')}
            </div>
            <div className="text-xs text-gray-500 mt-1">부정 댓글</div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
