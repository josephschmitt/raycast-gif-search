import { Action, ActionPanel, List } from "@raycast/api";

import { GifDetails } from "./GifDetails";
import type { IGif } from "../models/gif";

export function GifResult(props: { item: IGif; index: number }) {
  const { id, preview_gif_url, title, url } = props.item;

  return (
    <List.Item
      key={id}
      title={title}
      icon={{ source: preview_gif_url }}
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
