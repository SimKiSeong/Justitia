import SentimentSummary from "@/components/music/SentimentSummary";
import SentimentChart from '@/components/music/SentimentChart';
import TrendChart from '../components/music/TrendChart';

const mockData = [
  { time: '00:00', positive: 50, neutral: 25, negative: 15 },
  { time: '03:00', positive: 40, neutral: 60, negative: 20 },
  { time: '06:00', positive: 60, neutral: 35, negative: 25 },
  { time: '09:00', positive: 60, neutral: 40, negative: 25 },
  { time: '12:00', positive: 70, neutral: 45, negative: 25 },
  { time: '15:00', positive: 65, neutral: 50, negative: 40 },
  { time: '18:00', positive: 65, neutral: 40, negative: 45 },
  { time: '21:00', positive: 75, neutral: 60, negative: 45 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎵 감성 분석 테스트
          </h1>
          <p className="text-gray-600">
          </p>
        </div>
     
        {/* 감성 분석 섹션 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📊 감성 분석 요약
          </h2>
          <p className="text-gray-600 mb-6">
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <SentimentChart
                positive={1245}
                neutral={342}
                negative={89}
              />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <TrendChart data={mockData} />
            </div>
          </div>
          <SentimentSummary
            positive={1245}
            neutral={342}
            negative={89}
            total={1676}
          />
        </div>

       
      </div>
    </div>
  );
}
