import type { IGif as GiphyGif } from "@giphy/js-types";

export interface IGif {
  id: string | number;
  title: string;
  url: string;
  slug: string;
  preview_gif_url: string;
  gif_url: string;
}

export function mapGiphyResponse(giphyResp: GiphyGif) {
  return <IGif>{
    id: giphyResp.id,
    title: giphyResp.title,
    url: giphyResp.url,
    slug: giphyResp.slug,
    preview_gif_url: giphyResp.images.preview_gif.url,
    gif_url: giphyResp.images.downsized.url,
  };
}
