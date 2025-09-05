// API service for HiAnime endpoints

export interface AnimeEpisodes {
  sub: number;
  dub: number;
}

export interface SpotlightAnime {
  id: string;
  name: string;
  jname: string;
  poster: string;
  description: string;
  rank: number;
  otherInfo: string[];
  episodes: AnimeEpisodes;
}

export interface BasicAnime {
  id: string;
  name: string;
  poster: string;
  type: string;
  episodes: AnimeEpisodes;
}

export interface Top10Anime {
  episodes: AnimeEpisodes;
  id: string;
  name: string;
  poster: string;
  rank: number;
}

export interface HomePageData {
  success: boolean;
  data: {
    genres: string[];
    latestEpisodeAnimes: BasicAnime[];
    spotlightAnimes: SpotlightAnime[];
    top10Animes: {
      today: Top10Anime[];
      month: Top10Anime[];
      week: Top10Anime[];
    };
    topAiringAnimes: BasicAnime[];
    topUpcomingAnimes: BasicAnime[];
    trendingAnimes: BasicAnime[];
    mostPopularAnimes: BasicAnime[];
    mostFavoriteAnimes: BasicAnime[];
    latestCompletedAnimes: BasicAnime[];
  };
}

const API_BASE_URL = '/api/v2/hianime';

// Mock data for development/fallback
const MOCK_HOME_DATA: HomePageData = {
  success: true,
  data: {
    genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "Sci-Fi", "Slice of Life", "Supernatural", "Thriller"],
    latestEpisodeAnimes: [
      {
        id: "attack-on-titan-112",
        name: "Attack on Titan",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
        type: "TV",
        episodes: { sub: 87, dub: 84 }
      },
      {
        id: "demon-slayer-kimetsu-no-yaiba-55",
        name: "Demon Slayer: Kimetsu no Yaiba",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
        type: "TV",
        episodes: { sub: 44, dub: 34 }
      },
      {
        id: "one-piece-100",
        name: "One Piece",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg",
        type: "TV",
        episodes: { sub: 1080, dub: 1000 }
      },
      {
        id: "my-hero-academia-1176",
        name: "My Hero Academia",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-RoPwgrZ32gM3.jpg",
        type: "TV",
        episodes: { sub: 158, dub: 148 }
      },
      {
        id: "jujutsu-kaisen-tv-22199",
        name: "Jujutsu Kaisen",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
        type: "TV",
        episodes: { sub: 24, dub: 24 }
      }
    ],
    spotlightAnimes: [
      {
        id: "chainsaw-man-17406",
        name: "Chainsaw Man",
        jname: "チェンソーマン",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.jpg",
        description: "The world is full of devils, and humanity lives in fear of them. Devils are born from human fears and the stronger the fear, the stronger the devil. A young man named Denji has been trying to pay off his late father's debt to the yakuza by working with his pet devil Pochita to hunt other devils for bounties. But after Denji gets killed, Pochita makes a contract with him to share his heart and bring him back to life.",
        rank: 1,
        otherInfo: ["Oct 11, 2022", "TV", "23m"],
        episodes: { sub: 12, dub: 12 }
      },
      {
        id: "frieren-beyond-journeys-end-28755",
        name: "Frieren: Beyond Journey's End",
        jname: "葬送のフリーレン",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-gHcOAe8KohzK.jpg",
        description: "After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity's mortality. She takes on a new apprentice and promises to fulfill old friends' dying wishes. Can an immortal understand the weight of life?",
        rank: 2,
        otherInfo: ["Sep 29, 2023", "TV", "28m"],
        episodes: { sub: 28, dub: 0 }
      },
      {
        id: "blue-lock-25927",
        name: "Blue Lock",
        jname: "ブルーロック",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx137822-isPJZjx8GiKr.jpg",
        description: "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. But what's missing? An absolute Ace Striker, who can guide them to the win. The Japan Football Union is hell-bent on creating a striker who hungers for goals and thirsts for victory, and who can be the decisive instrument in turning around a losing match...",
        rank: 3,
        otherInfo: ["Oct 9, 2022", "TV", "24m"],
        episodes: { sub: 24, dub: 24 }
      }
    ],
    top10Animes: {
      today: [
        {
          episodes: { sub: 28, dub: 0 },
          id: "frieren-beyond-journeys-end-28755",
          name: "Frieren: Beyond Journey's End",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-gHcOAe8KohzK.jpg",
          rank: 1
        },
        {
          episodes: { sub: 12, dub: 12 },
          id: "chainsaw-man-17406",
          name: "Chainsaw Man",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.jpg",
          rank: 2
        },
        {
          episodes: { sub: 24, dub: 24 },
          id: "blue-lock-25927",
          name: "Blue Lock",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx137822-isPJZjx8GiKr.jpg",
          rank: 3
        }
      ],
      month: [
        {
          episodes: { sub: 87, dub: 84 },
          id: "attack-on-titan-112",
          name: "Attack on Titan",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
          rank: 1
        },
        {
          episodes: { sub: 44, dub: 34 },
          id: "demon-slayer-kimetsu-no-yaiba-55",
          name: "Demon Slayer: Kimetsu no Yaiba",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
          rank: 2
        }
      ],
      week: [
        {
          episodes: { sub: 24, dub: 24 },
          id: "jujutsu-kaisen-tv-22199",
          name: "Jujutsu Kaisen",
          poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
          rank: 1
        }
      ]
    },
    topAiringAnimes: [
      {
        id: "spy-x-family-23289",
        name: "Spy x Family",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-V3QpsAU4CWzi.jpg",
        type: "TV",
        episodes: { sub: 25, dub: 25 }
      },
      {
        id: "kaguya-sama-wa-kokurasetai-101921",
        name: "Kaguya-sama: Love is War",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101921-VrZ0LNSlPFCW.jpg",
        type: "TV",
        episodes: { sub: 36, dub: 24 }
      }
    ],
    topUpcomingAnimes: [
      {
        id: "tower-of-god-season-2-168187",
        name: "Tower of God Season 2",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx168187-kEFqEQRGwu8x.jpg",
        type: "TV",
        episodes: { sub: 0, dub: 0 }
      }
    ],
    trendingAnimes: [
      {
        id: "wind-breaker-171745",
        name: "Wind Breaker",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171745-ZRHE0n5RKtbf.jpg",
        type: "TV",
        episodes: { sub: 13, dub: 0 }
      },
      {
        id: "kaiju-no-8-170001",
        name: "Kaiju No. 8",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx170001-0MiP1Wa3vE7a.jpg",
        type: "TV",
        episodes: { sub: 12, dub: 12 }
      }
    ],
    mostPopularAnimes: [
      {
        id: "attack-on-titan-112",
        name: "Attack on Titan",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
        type: "TV",
        episodes: { sub: 87, dub: 84 }
      },
      {
        id: "demon-slayer-kimetsu-no-yaiba-55",
        name: "Demon Slayer: Kimetsu no Yaiba",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg",
        type: "TV",
        episodes: { sub: 44, dub: 34 }
      },
      {
        id: "one-piece-100",
        name: "One Piece",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg",
        type: "TV",
        episodes: { sub: 1080, dub: 1000 }
      },
      {
        id: "my-hero-academia-1176",
        name: "My Hero Academia",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21459-RoPwgrZ32gM3.jpg",
        type: "TV",
        episodes: { sub: 158, dub: 148 }
      },
      {
        id: "jujutsu-kaisen-tv-22199",
        name: "Jujutsu Kaisen",
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg",
        type: "TV",
        episodes: { sub: 24, dub: 24 }
      }
    ],
    mostFavoriteAnimes: [],
    latestCompletedAnimes: []
  }
};

export const animeAPI = {
  async getHomePage(): Promise<HomePageData> {
    try {
      const response = await fetch(`${API_BASE_URL}/home`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Return mock data when API is unavailable
      return MOCK_HOME_DATA;
    }
  },

  async getAnimeDetails(animeId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/anime/${animeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  async searchAnime(query: string, page: number = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  }
};