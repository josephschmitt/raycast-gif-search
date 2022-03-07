import { Action, ActionPanel, List } from "@raycast/api";
import type { IGif } from "@giphy/js-types";

import { GifDetails } from "./GifDetails";

export function GifResult(props: { item: IGif; index: number }) {
  const { id, images, title, url } = props.item;

  return (
    <List.Item
      key={id}
      title={title}
      icon={{ source: images.preview_gif.url }}
      actions={
        <ActionPanel title={title}>
          <Action.Push title="Preview GIF" target={<GifDetails item={props.item} index={props.index} />} />
          <Action.OpenInBrowser url={url} />
          <Action.CopyToClipboard content={url} shortcut={{ modifiers: ["cmd", "shift"], key: "c" }} />
        </ActionPanel>
      }
    />
  );
}
