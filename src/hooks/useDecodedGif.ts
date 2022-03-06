import fs from 'fs';
import gifFrames from 'gif-frames';
import path from 'path';
import {useEffect, useState} from 'react';

import {environment} from '@raycast/api';

export interface DecodedGifState {
  url: string;
  frames?: string[];
}

export function useDecodedGif(url: string, id: string | number) {
  const [state, setState] = useState<DecodedGifState>({url});

  useEffect(() => {
    async function decode() {
      const frames = await gifFrames({url, frames: 'all'});
      const framePaths: string[] = [];

      const outputDir = path.join(environment.assetsPath, 'decoded-frames', String(id));
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {recursive: true});
      }

      for (const frame of frames) {
        const outputPath = path.join(outputDir, `${frame.frameIndex}.jpg`);

        frame.getImage().pipe(fs.createWriteStream(outputPath));
        framePaths.push(outputPath);
      }

      setState({url, frames: framePaths});
    }

    decode();
  }, [url])

  return state;
}
