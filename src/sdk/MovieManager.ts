import {useEffect, useState} from 'react';
export const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDUwZmYxZWEwNjEwYmZlNDJkMGJiMzEyZWUxNmRiYSIsIm5iZiI6MTczNTI3MDE3NC4xOTkwMDAxLCJzdWIiOiI2NzZlMWYxZTc2OTg1MmYyOTAxMjlkZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-aFhPbLWbDyO_JTeURYXRdX9tTYug-HBAalQhmwXRQI'

import {IMovie, IMovieDetail, Review} from './type';
import {useDebounce} from './useDebounce';
import {
  GET_MOVIE_DETAIL_URL,
  GET_MOVIE_REVIEWS_URL,
  IMAGE_ORIGINAL_URL,
  SEARCH_MOVIE_URL,
  TRENDING_MOVIE_URL,
} from './ApiDomain';

export function useSearchMovie({
  initSearchQuery,
  performanceMode,
}: {
  initSearchQuery: string;
  performanceMode: 'debounce' | 'normal';
}) {
  const [query, setQuery] = useState(initSearchQuery);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const debouncedSearchQuery = useDebounce(
    query,
    performanceMode == 'debounce' ? 500 : 0,
  );
  useEffect(() => {
    const url = debouncedSearchQuery
      ? `${TRENDING_MOVIE_URL}${debouncedSearchQuery}`
      : `${SEARCH_MOVIE_URL}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setMovieList(
          json.results.map((i: any) => {
            return {
              ...i,
              uri: i.backdrop_path
                ? IMAGE_ORIGINAL_URL + i.backdrop_path
                : null,
            };
          }),
        );
      })
      .catch(err => console.error(err));
  }, [debouncedSearchQuery]);

  const setSearchQuery = (newQuery: string) => {
    setLoading(true);
    setQuery(newQuery);
  };

  return {
    movieList,
    setSearchQuery: setSearchQuery,
    searchQuery: query,
    loading,
  };
}

export function useGetMovieDetail({id}: {id: number}): {
  movieDetail: IMovieDetail | null;
  loading: boolean;
} {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    //get movie details
    const url = `${GET_MOVIE_DETAIL_URL}${id}?&append_to_response=credits`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setMovieDetail({
          ...json,
          backdrop_url: json.backdrop_path
            ? IMAGE_ORIGINAL_URL + json.backdrop_path
            : null,
        });
      })
      .catch(err => console.error(err));
  }, []);
  return {movieDetail, loading};
}

export function useGetMovieReviews({id, page}: {id: number; page: number}): {
  reviews: Review[];
  totalPage: number;
  loading: boolean;
} {
  const [totalPage, setTotalPage] = useState(page);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    //get movie review
    const url = GET_MOVIE_REVIEWS_URL(id, page);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        //console.log("anbnp",JSON.stringify(json));
        setLoading(false);
        setReviews(json?.results);
        setTotalPage(json?.total_pages);
      })
      .catch(err => console.error(err));
  }, [page]);
  return {reviews, loading, totalPage};
}