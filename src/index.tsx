import {List, showToast, Toast } from "@raycast/api";
import {useEffect} from 'react';

import useGiphy, {Topic} from './useGiphy';
import {GifResult} from "./components/GifResult";
import './fetch-polyfill';


export default function Command() {
  const state = useGiphy(Topic.TRENDING, {});

  useEffect(() => {
    if (state.error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed loading stories",
        message: state.error.message,
      });
    }
  }, [state.error]);

  return (
    <List isLoading={!state.items && !state.error}>
      {state.items?.data.map((result, index) => (
        <GifResult key={result.id} item={result} index={index} />
      ))}
    </List>
  );
}
