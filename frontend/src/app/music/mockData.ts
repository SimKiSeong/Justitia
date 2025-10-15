import { MusicAnalysis } from './types';

export const mockMusicData: { [key: string]: MusicAnalysis } = {
  '1': {
    music: {
      id: '1',
      title: 'APT.',
      artist: '로제 (ROSÉ), Bruno Mars',
      album: 'APT.',
      albumCover: 'https://cdnimg.melon.co.kr/cm2/album/images/118/59/863/11859863_20250620104512_500.jpg',
      releaseDate: '2024.10.18',
      genre: 'POP',
      duration: '2:49',
      lyrics: `Don't you want me like I want you, baby?
Don't you need me like I need you now?
Sleep tomorrow, but tonight go crazy
All you gotta do is just meet me at the...`
    },
    overallScore: 92,
    ratings: [
      {
        platform: 'YouTube',
        score: 9.5,
        maxScore: 10,
        icon: '📺',
        color: 'red',
        description: '조회수 5억뷰 돌파, 좋아요 1500만',
        trend: 'up',
        trendValue: 12
      },
      {
        platform: 'Twitter',
        score: 8.8,
        maxScore: 10,
        icon: '🐦',
        color: 'blue',
        description: '실시간 트렌드 1위, 멘션 250만+',
        trend: 'up',
        trendValue: 8
      },
      {
        platform: 'TikTok',
        score: 9.7,
        maxScore: 10,
        icon: '🎵',
        color: 'black',
        description: '챌린지 참여 500만, 사운드 사용 800만+',
        trend: 'up',
        trendValue: 15
      },
      {
        platform: 'Spotify',
        score: 9.2,
        maxScore: 10,
        icon: '🎧',
        color: 'green',
        description: '글로벌 차트 TOP 5, 일일 스트리밍 2000만+',
        trend: 'stable',
        trendValue: 0
      },
      {
        platform: 'Instagram',
        score: 9.0,
        maxScore: 10,
        icon: '📷',
        color: 'purple',
        description: '릴스 조회수 10억+, 해시태그 게시물 500만+',
        trend: 'up',
        trendValue: 5
      }
    ],
    weeklyPlays: 45678900,
    totalPlays: 892345678,
    peakRank: 1,
    currentRank: 1,
    weeksOnChart: 8,
    sentimentScore: 94
  },
  '2': {
    music: {
      id: '2',
      title: 'Whiplash',
      artist: 'aespa',
      album: 'Whiplash - The 5th Mini Album',
      albumCover: 'https://cdnimg.melon.co.kr/cm2/album/images/118/90/480/11890480_20250711095238_500.jpg',
      releaseDate: '2024.10.21',
      genre: 'Dance',
      duration: '3:05'
    },
    overallScore: 88,
    ratings: [
      {
        platform: 'YouTube',
        score: 9.0,
        maxScore: 10,
        icon: '📺',
        color: 'red',
        description: '조회수 2억뷰, 좋아요 800만',
        trend: 'up',
        trendValue: 10
      },
      {
        platform: 'Twitter',
        score: 8.5,
        maxScore: 10,
        icon: '🐦',
        color: 'blue',
        description: '실시간 트렌드 TOP 3, 멘션 150만+',
        trend: 'stable',
        trendValue: 0
      },
      {
        platform: 'TikTok',
        score: 9.2,
        maxScore: 10,
        icon: '🎵',
        color: 'black',
        description: '챌린지 참여 300만, 사운드 사용 500만+',
        trend: 'up',
        trendValue: 20
      },
      {
        platform: 'Spotify',
        score: 8.7,
        maxScore: 10,
        icon: '🎧',
        color: 'green',
        description: '글로벌 차트 TOP 10, 일일 스트리밍 1500만+',
        trend: 'down',
        trendValue: -3
      },
      {
        platform: 'Instagram',
        score: 8.8,
        maxScore: 10,
        icon: '📷',
        color: 'purple',
        description: '릴스 조회수 5억+, 해시태그 게시물 300만+',
        trend: 'up',
        trendValue: 7
      }
    ],
    weeklyPlays: 34567890,
    totalPlays: 567890123,
    peakRank: 1,
    currentRank: 2,
    weeksOnChart: 6,
    sentimentScore: 89
  }
};