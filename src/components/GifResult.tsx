import {IGif} from '@giphy/js-types';

import {Action, ActionPanel, Detail, List} from "@raycast/api";

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

export function GifDetails(props: {item: IGif, index: number}) {
  const {original} = props.item.images;
  const md = `<img src="${original.url}" width="50%" height="auto" />`;

  return (
    <Detail markdown={md} />
  );
}
