export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            차트를 차트답게 <span className="text-blue-600">Justitia</span>
          </h1>
          <p className="text-xl text-gray-600">
            음악 차트의 공정성을 위한 감성 분석 플랫폼
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">실시간 차트</h3>
            <p className="text-gray-600">
              최신 음악 차트와 감성 분석 데이터를 실시간으로 확인하세요
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">아티스트 분석</h3>
            <p className="text-gray-600">
              아티스트별 팬 반응과 감성 트렌드를 분석합니다
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">댓글 분석</h3>
            <p className="text-gray-600">
              YouTube, X 등 소셜 미디어 댓글 감성을 분석합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
