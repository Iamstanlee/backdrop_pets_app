import {useEffect, useState} from 'react';

const useFetch = <T>(page: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>();
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchPost = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(
          `https://api.thedogapi.com/v1/breeds?attach_breed=0&limit=32&page=${page}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'b519aae2-1bc3-43e7-9710-ced4202c19bf',
            },
          },
        );
        const json = await response.json();
        if (response.status === 200) {
          setData(json as T);
          setIsLoaded(true);
        } else {
          setError('An unexpected error occured');
        }
      } catch (e) {
        setError((e as Error).message);
      }
      if (!isLoaded) setIsLoading(false);
      setIsFetching(false);
    };
    fetchPost();
  }, [page]);

  return {isLoading, isFetching, error, data};
};

export default useFetch;
