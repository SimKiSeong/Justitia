'use client';

interface OverallScoreProps {
  score: number;
  sentimentScore: number;
}

export default function OverallScore({ score, sentimentScore }: OverallScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrade = (score: number) => {
    if (score >= 95) return 'S+';
    if (score >= 90) return 'S';
    if (score >= 85) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">종합 스코어</h2>

      <div className="flex flex-col items-center mb-6">
        <div className={`text-7xl font-bold ${getScoreColor(score)} mb-2`}>
          {score}
        </div>
        <div className="text-4xl font-bold text-gray-700">
          {getGrade(score)}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">플랫폼 평균</span>
            <span className="text-sm font-bold text-gray-800">{score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">대중 호감도</span>
            <span className="text-sm font-bold text-gray-800">{sentimentScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-400 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${sentimentScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">평가 기준</p>
            <p className="text-sm font-semibold text-gray-700">5개 플랫폼</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">분석 기간</p>
            <p className="text-sm font-semibold text-gray-700">최근 7일</p>
          </div>
        </div>
      </div>
    </div>
  );
}