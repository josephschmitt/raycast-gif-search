import {IGif} from '@giphy/js-types';
import {Action, ActionPanel, List} from "@raycast/api";

import {GifDetails} from './GifDetails';

export function GifResult(props: {item: IGif, index: number}) {
  return (
    <List.Item
      key={props.item.id}
      title={props.item.title}
      icon={{source: props.item.images.original.url}}
      actions={
        <ActionPanel title={props.item.title}>
          <Action.Push
            title="Show Details"
            target={<GifDetails item={props.item} index={props.index} />}
          />
        </ActionPanel>
      }
    />
  )
}
