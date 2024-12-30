export const API_DOMAIN = "https://api.themoviedb.org";
export const SEARCH_MOVIE_URL = (query: string, page: number) =>
  `${API_DOMAIN}/3/search/movie?include_adult=false&page=${page}&query=${query}`;

export const TRENDING_MOVIE_URL = `${API_DOMAIN}/3/trending/movie/day?language=en-US`;
export const GET_MOVIE_DETAIL_URL = `${API_DOMAIN}/3/movie/`;
export const GET_MOVIE_REVIEWS_URL = (movie_id: number, page: number) =>
  `${API_DOMAIN}/3/movie/${movie_id}/reviews?language=en-US&page=${page}`;
export const GET_MOVIE_KEYWORDS = (movie_id: number) =>
  `${API_DOMAIN}/3/movie/${movie_id}/keywords`;

export const IMAGE_DOMAIN = "https://image.tmdb.org";

//currently I don't have problem with using original images quality, so keep the image quality as original.
//IMAGE_500_URL will be used later to optimize for slow internet connection
export const IMAGE_ORIGINAL_URL = `${IMAGE_DOMAIN}/t/p/original`;
export const IMAGE_500_URL = `${IMAGE_DOMAIN}/t/p/w500`;
