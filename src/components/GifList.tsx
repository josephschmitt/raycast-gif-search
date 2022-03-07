import {IGif} from '@giphy/js-types';
import {List, showToast, Toast} from "@raycast/api";

import {GifResult} from "./GifResult";

export function GifList(props: {
  term?: string,
  results?: IGif[],
}) {
  if (props.term) {
    return (
      <List.Section title={`GIF results for "${props.term}"`}>
        {props.results?.map((result, index) => (
          <GifResult key={result.id} item={result} index={index} />
        ))}
      </List.Section>
    );
  }

  return (
    <List.Section title="Trending">
      {props.results?.map((result, index) => (
        <GifResult key={result.id} item={result} index={index} />
      ))}
    </List.Section>
  );
}
