'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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
  return (
    <div className="trend-chart flex justify-center items-center h-full">
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="time" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Line type="natural" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={false} />
        <Line type="natural" dataKey="neutral" stroke="#fbbf24" strokeWidth={2} dot={false} />
        <Line type="natural" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
};

export default TrendChart;