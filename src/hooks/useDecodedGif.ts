import {ReadStream} from 'fs';
import gifFrames from 'gif-frames';
import {useEffect, useState} from 'react';

export interface DecodedGifState {
  url: string;
  frames?: string[];
}

export function useDecodedGif(url: string, id: string | number) {
  const [state, setState] = useState<DecodedGifState>({url});

  useEffect(() => {
    async function decode() {
      const frames = await gifFrames({url, frames: 'all'});
      const base64Frames: string[] = [];

      for (const frame of frames) {
        const buff = await stream2buffer(frame.getImage());
        base64Frames.push(buff.toString('base64'));
      }

      setState({url, frames: base64Frames});
    }

    decode();
  }, [url])

  return state;
}

async function stream2buffer(stream: ReadStream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks = Array<any>();
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", err => reject(`error converting stream - ${err}`));
  });
}
