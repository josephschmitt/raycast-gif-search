import {IGif} from '@giphy/js-types';
import {Detail} from "@raycast/api";

import {useDecodedGif} from '../hooks/useDecodedGif';
import {useGifFrames} from "../hooks/useGifFrames";

export function GifDetails(props: {item: IGif, index: number}) {
  const {frames = []} = useDecodedGif(props.item.images.original.url, props.item.slug);
  const {currentFrame} = useGifFrames(0, frames, 60);

  const md = `<img src="data:image/jpeg;base64,${currentFrame}">`;

  return <Detail navigationTitle={props.item.title} markdown={md} />;
}
