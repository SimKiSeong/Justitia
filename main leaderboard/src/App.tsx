import React, { useEffect, useMemo, useState } from "react";

const API_URL = "/daily-final-score";

interface DailyFinalScore {
  id: number;
  dateKst: string;
  query: string;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  normView: number;
  pctComment: number;
  likeRatio: number;
  sentimentTrueMean: number;
  sentimentNorm: number;
  socialNormMean: number;
  weights: string;
  dView: number;
  scenario: string;
  score_5: number;
  grade: string;
  timestampKst: string;
}

type SortKey = "rank" | "title" | "score";

interface SortState {
  key: SortKey;
  direction: "asc" | "desc";
}

interface ParsedTitle {
  artist: string;
  track: string;
}

function toDisplayScore(score5: number): number {
  return Math.round((score5 / 4.5) * 100);
}

// "aespa 에스파 'Rich Man' MV" -> artist: "aespa 에스파", track: "Rich Man"
function parseTitle(raw: string): ParsedTitle {
  const match = raw.match(/^(.*?)'(.+?)'/);
  if (match) {
    const artist = match[1].trim();
    const track = match[2].trim();
    return { artist, track };
  }
  return { artist: "", track: raw };
}

function formatKoreanDate(date: Date | null): string {
  if (!date) return "날짜 없음";
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date | null): string {
  if (!date) return "--:--:--";
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function App() {
  const [data, setData] = useState<DailyFinalScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState>({ key: "rank", direction: "asc" });

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("API error");
      const json: DailyFinalScore[] = await res.json();

      setData(json);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setError("리더보드 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = useMemo(() => {
    const baseSorted = [...data].sort((a, b) => b.score_5 - a.score_5);

    const withRank = baseSorted.map((item, index) => ({
      ...item,
      rank: index + 1,
      displayScore: toDisplayScore(item.score_5),
    }));

    const filtered = withRank.filter((item) => {
      const target = (item.title + " " + item.query).toLowerCase();
      return target.includes(search.toLowerCase());
    });

    const dir = sort.direction === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      switch (sort.key) {
        case "rank":
          return (a.rank - b.rank) * dir;
        case "title":
          return a.title.localeCompare(b.title) * dir;
        case "score":
          return (a.displayScore - b.displayScore) * dir;
        default:
          return 0;
      }
    });
  }, [data, search, sort]);

  const toggleSort = (key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: key === "score" ? "desc" : "asc" }
    );
  };

  const sortArrow = (key: SortKey) => {
    if (sort.key !== key) return "";
    return sort.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <div className="app-header-left">
            <div className="brand">
              <div className="brand-logo">
                <img src="/justitia-logo.svg" alt="Justitia 로고" />
              </div>
              <div className="brand-text">
                <div className="brand-title-kr">차트를 차트답게</div>
                <div className="brand-title-en">Justitia</div>
              </div>
            </div>
          </div>

          <div className="app-header-right">
            <div className="date-time-bar">
              <span className="date-text">
                {lastUpdated ? formatKoreanDate(lastUpdated) : "데이터 없음"}
              </span>
              <span className="time-text">
                {lastUpdated ? formatTime(lastUpdated) : "--:--:--"}
              </span>
              <button
                type="button"
                className="refresh-btn"
                onClick={fetchData}
                title="데이터 새로고침"
              >
                ⟳
              </button>
            </div>

            <input
              type="text"
              placeholder="곡명 / 아티스트 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        {loading && (
          <div className="status-text">데이터를 불러오는 중입니다...</div>
        )}

        {error && <div className="error-box">{error}</div>}

        {!loading && !error && (
          <div className="card">
            <table className="leaderboard-table">
              <colgroup>
                <col className="col-rank" />
                <col className="col-info" />
                <col className="col-score" />
                <col className="col-grade" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    className="col-rank clickable"
                    onClick={() => toggleSort("rank")}
                  >
                    순위 <span className="sort-arrow">{sortArrow("rank")}</span>
                  </th>
                  <th
                    className="col-info clickable"
                    onClick={() => toggleSort("title")}
                  >
                    곡 정보{" "}
                    <span className="sort-arrow">{sortArrow("title")}</span>
                  </th>
                  <th
                    className="col-score clickable"
                    onClick={() => toggleSort("score")}
                  >
                    유튜브 점수{" "}
                    <span className="sort-arrow">{sortArrow("score")}</span>
                  </th>
                  <th className="col-grade">유튜브 등급</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item) => {
                  const parsed = parseTitle(item.title);
                  const mainTitle = parsed.track || item.title;
                  const subText =
                    parsed.artist && parsed.track
                      ? `${parsed.artist} | ${parsed.track}`
                      : item.query;

                  return (
                    <tr key={item.id} className="table-row">
                      <td className="col-rank">
                        <span className="rank-number">{item.rank}</span>
                      </td>

                      <td className="col-info">
                        <div className="track-cell">
                          <div className="thumb-wrapper">
                            <img
                              src="/track-thumb.png"
                              alt={mainTitle}
                              className="track-thumb"
                            />
                          </div>
                          <div className="track-text">
                            <div className="track-title">{mainTitle}</div>
                            <div className="track-sub">{subText}</div>
                          </div>
                        </div>
                      </td>

                      <td className="col-score score-cell">
                        {toDisplayScore(item.score_5)}
                      </td>

                      <td className="col-grade grade-cell">
                        {item.grade}
                      </td>
                    </tr>
                  );
                })}

                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="no-data">
                      표시할 데이터가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;