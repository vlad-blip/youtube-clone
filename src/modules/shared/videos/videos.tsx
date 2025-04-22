import Video from "./video";

import type { IVideo } from "../types";

enum VideoSize {
  sm = "videos-sm",
  md = "videos-md",
}

interface VideosProps {
  items: IVideo[];
  size: keyof typeof VideoSize;
}

export default function Videos({ items, size }: VideosProps) {
  return (
    <ul className={VideoSize[size]}>
      {items.map((item: IVideo) => (
        <li key={item.id}>
          <Video {...item} className="flex flex-col gap-2 w-full rounded-xl" />
        </li>
      ))}
    </ul>
  );
}
