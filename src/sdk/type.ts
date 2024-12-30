export type IMovie = {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: string;
  vote_average: string;
  vote_count: number;
  uri: string;
};

export type IMovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  backdrop_url: string;
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path?: string;
    }[];
  };
};

export type Review = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null; // Include `null` since rating might not always be present
  };
  content: string;
  created_at: string; // ISO date string
  id: string;
  updated_at: string; // ISO date string
  url: string;
};

export type Keyword = {
  id: number;
  name: string;
};

export type IMovieList = {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
};
