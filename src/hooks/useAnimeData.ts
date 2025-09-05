import { useQuery } from '@tanstack/react-query';
import { animeAPI, HomePageData } from '@/services/api';

export const useHomePageData = () => {
  return useQuery<HomePageData, Error>({
    queryKey: ['homePage'],
    queryFn: animeAPI.getHomePage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAnimeDetails = (animeId: string) => {
  return useQuery({
    queryKey: ['animeDetails', animeId],
    queryFn: () => animeAPI.getAnimeDetails(animeId),
    enabled: !!animeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchAnime = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['searchAnime', query, page],
    queryFn: () => animeAPI.searchAnime(query, page),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
};