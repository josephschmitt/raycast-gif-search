import {useEffect, useState} from "react";

import {GiphyFetch} from '@giphy/js-fetch-api'
import type {GifsResult} from '@giphy/js-fetch-api';

import {getAPIKey} from './preferences';

interface State {
  items?: GifsResult;
  error?: Error;
}

export enum Topic {
  TRENDING = 0,
  SEARCH = 1,
}


const gf = new GiphyFetch(getAPIKey())

export default function useGiphy(topic: Topic, {term = "", offset = 0}) {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    async function getTrending() {
      const results = await gf.trending({offset, limit: 10});
      setState({items: results});
    }

    async function search(term: string) {
      const results = await gf.search(term, {offset});
      setState({items: results});
    }

    switch (topic) {
      case Topic.SEARCH:
        search(term);
        break;
      case Topic.TRENDING:
      default:
        getTrending();
        break;
    }
  })

  return state;
}
