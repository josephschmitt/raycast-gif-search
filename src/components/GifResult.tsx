import {IGif} from '@giphy/js-types';
import {Action, ActionPanel, List} from "@raycast/api";

import {GifDetails} from './GifDetails';

export function GifResult(props: {item: IGif, index: number}) {
  const {id, title, images} = props.item;

  return (
    <List.Item
      key={id}
      title={title}
      icon={{source: images.preview_gif.url}}
      actions={
        <ActionPanel title={title}>
          <Action.Push
            title="Show Details"
            target={<GifDetails item={props.item} index={props.index} />}
          />
        </ActionPanel>
      }
    />
  )
}
