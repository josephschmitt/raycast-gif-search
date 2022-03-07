import {useCallback, useEffect, useRef, useState} from 'react';
import {AbortError} from 'node-fetch';

import {GiphyFetch} from '@giphy/js-fetch-api'
import type {GifsResult} from '@giphy/js-fetch-api';
import type {IGif} from '@giphy/js-types';

import {getAPIKey} from '../preferences';

interface FetchState {
  term?: string;
  items?: IGif[];
  error?: Error;
}

const gf = new GiphyFetch(getAPIKey())

export default function useGiphyAPI({offset = 0}) {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<FetchState>();
  const cancelRef = useRef<AbortController | null>(null);

  const search = useCallback(
    async function search(term?: string) {
      cancelRef.current?.abort();
      cancelRef.current = new AbortController();
      setIsLoading(true);

      let results: GifsResult;
      try {
        if (term) {
          results = await gf.search(term, {offset});
        } else {
          results = await gf.trending({offset, limit: 10});
        }
        setResults({items: results.data, term});
      } catch (e) {
        const error = e as Error;
        if (e instanceof AbortError) {
          return;
        }
        setResults({error});
      } finally {
        setIsLoading(false);
      }
    },
    [cancelRef, setIsLoading, setResults],
  );

  useEffect(() => {
    search();
    return () => {
      cancelRef.current?.abort();
    };
  }, []);

  return [results, isLoading, search] as const;
}
