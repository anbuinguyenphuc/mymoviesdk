import { useEffect, useState } from "react";

import { IMovie, IMovieDetail, Keyword, Review } from "./type";
import { useDebounce } from "./useDebounce";
import {
  GET_MOVIE_DETAIL_URL,
  GET_MOVIE_KEYWORDS,
  GET_MOVIE_REVIEWS_URL,
  IMAGE_ORIGINAL_URL,
  SEARCH_MOVIE_URL,
  TRENDING_MOVIE_URL,
} from "./ApiDomain";
import { get } from "./http-helper";

export function useSearchMovie({
  initSearchQuery,
  performanceMode,
}: {
  initSearchQuery: string;
  performanceMode: "debounce" | "normal";
}) {
  const [query, setQuery] = useState(initSearchQuery);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const debouncedSearchQuery = useDebounce(
    query,
    performanceMode == "debounce" ? 500 : 0
  );

  const requestSearchMovies = () => {
    const url = debouncedSearchQuery
      ? `${TRENDING_MOVIE_URL}${debouncedSearchQuery}`
      : `${SEARCH_MOVIE_URL}`;

    get({ url })
      .then((json) => {
        setLoading(false);
        setError(null);
        if (json?.results) {
          setMovieList(
            json.results.map((i: any) => {
              return {
                ...i,
                uri: i.backdrop_path
                  ? IMAGE_ORIGINAL_URL + i.backdrop_path
                  : null,
              };
            })
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(err);
      });
  };
  useEffect(() => {
    requestSearchMovies();
  }, [debouncedSearchQuery]);

  const setSearchQuery = (newQuery: string) => {
    setLoading(true);
    setQuery(newQuery);
  };

  return {
    movieList,
    setSearchQuery: setSearchQuery,
    refreshMovies: requestSearchMovies,
    searchQuery: query,
    loading,
    error,
  };
}

export function useGetMovieDetail({ id }: { id: number }): {
  movieDetail: IMovieDetail | null;
  loading: boolean;
  error: Error;
} {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);

    //get movie details
    const url = `${GET_MOVIE_DETAIL_URL}${id}?&append_to_response=credits`;

    get({ url })
      .then((json) => {
        setLoading(false);
        setError(null);
        if (json) {
          setMovieDetail({
            ...json,
            backdrop_url: json.backdrop_path
              ? IMAGE_ORIGINAL_URL + json.backdrop_path
              : null,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(err);
      });
  }, []);
  return { movieDetail, loading, error };
}

export function useGetMovieReviews({
  id,
  page,
}: {
  id: number;
  page: number;
}): {
  reviews: Review[];
  totalPage: number;
  loading: boolean;
  error: Error;
} {
  const [totalPage, setTotalPage] = useState(page);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);

    //get movie review
    const url = GET_MOVIE_REVIEWS_URL(id, page);

    get({ url })
      .then((json) => {
        //console.log("anbnp",JSON.stringify(json));
        setLoading(false);
        setReviews(json?.results);
        setTotalPage(json?.total_pages);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(err);
      });
  }, [page]);
  return { reviews, loading, totalPage, error };
}

export function useGetMovieKeywords({ id }: { id: number }): {
  keywords: Keyword[];
  loading: boolean;
  error: Error;
} {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    //get movie keywords
    const url = GET_MOVIE_KEYWORDS(id);

    get({ url })
      .then((json) => {
        setLoading(false);
        setError(null)
        setKeywords(json?.keywords);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(err);
      });
  }, []);
  return { keywords, loading, error };
}
